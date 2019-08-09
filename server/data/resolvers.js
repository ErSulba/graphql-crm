import mongoose from 'mongoose';
import { Clients, Products, Orders, Users } from './db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ApolloError } from 'apollo-server-express';

dotenv.config({ path: 'variables.env' });

const generateToken = (userData, secret, expiresIn) => {
  const { user } = userData;
  // console.log(secret);
  // console.log(user);
  return jwt.sign({ user }, secret, { expiresIn });
};

export const resolvers = {
  Query: {
    getClient: async (root, { id }) => {
      // return new Promise((resolve, object) => {
      //   Clients.findById(id, (error, client) => {
      //     if (error) rejects(error);
      //     else resolve(client);
      //   });
      // });
      try {
        const client = await Clients.findById(id);
        return client;
      } catch (e) {
        // does it returns an error? IDk, have to search.
        throw new Error(e);
      }
      // const client = await Clients.findById(id);
    },

    getClients: (root, { limit, offset }) => {
      return Clients.find({})
        .limit(limit)
        .skip(offset);
    },
    totalClients: root => {
      return new Promise((resolve, object) => {
        Clients.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count);
        });
      });
    },

    getProducts: (root, { limit, offset, stock }) => {
      let filter;
      if (stock) {
        // this filter means that if the stock is lower to 0 it won show at all
        filter = { stock: { $gt: 0 } };
      }
      return Products.find(filter)
        .limit(limit)
        .skip(offset);
    },

    getProduct: (root, { id }) => {
      return new Promise((resolve, reject) => {
        Products.findById(id, (error, product) => {
          if (error) reject(error);
          else resolve(product);
        });
      });
    },

    totalProducts: root => {
      return new Promise(resolve => {
        Products.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count);
        });
      });
    },
    getOrders: (root, { cliente }) => {
      return new Promise((resolve, reject) => {
        Orders.find({ cliente: cliente }, (error, pedido) => {
          if (error) reject(error);
          else resolve(pedido);
        });
      });
    },
    topClients: root => {
      return new Promise((resolve, reject) => {
        Orders.aggregate(
          [
            {
              $match: {
                estado: 'COMPLETADO'
              }
            },
            {
              $group: {
                _id: '$cliente',
                total: {
                  $sum: '$total'
                }
              }
            },
            {
              $lookup: {
                from: 'clients',
                localField: '_id',
                foreignField: '_id',
                as: 'cliente'
              }
            },
            {
              $sort: {
                total: -1
              }
            },
            {
              $limit: 10
            }
          ],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    },

    getUser: (root, args, context) => {
      const { actualUser } = context;
      if (!actualUser) {
        return null;
      }

      const user = Users.findOne({ user: actualUser.user });
      // console.log(user);
      return user;
    }
  },
  Mutation: {
    //Creates client
    createClient: (root, { input }) => {
      const newClient = new Clients({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        edad: input.edad,
        tipo: input.tipo,
        pedidos: input.pedidos
      });
      newClient.id = newClient._id;

      return new Promise((resolve, object) => {
        newClient.save(error => {
          if (error) rejects(error);
          else resolve(newClient);
        });
      });
    },

    // Update client or create a new one
    updateClient: (root, { input }) => {
      return new Promise((resolve, object) => {
        Clients.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, client) => {
            if (error) rejects(error);
            else resolve(client);
          }
        );
      });
    },

    //Delete Client
    deleteClient: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clients.findOneAndRemove({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se eliminó correctamente nojoda vergacion');
        });
      });
    },

    //Create Products
    createProduct: (root, { input }) => {
      const newProduct = new Products({
        nombre: input.nombre,
        precio: input.precio,
        stock: input.stock
      });

      newProduct.id = newProduct._id;

      return new Promise((resolve, object) => {
        newProduct.save(error => {
          if (error) rejects(error);
          else resolve(newProduct);
        });
      });
    },

    //Update product resolver
    updateProduct: (root, { input }) => {
      return new Promise((resolve, product) => {
        Products.findOneAndUpdate(
          //The id of the product that will be updated, extracted from the input object
          { _id: input.id },
          // The input object with all the new changes
          input,
          //if the id doesn't exist it creates a new product
          { new: true },
          // Callback that resolves the promise or throws an error in case if something is failng
          (error, product) => {
            if (error) rejects(error);
            else resolve(product);
          }
        );
      });
    },

    //Delete product
    deleteProduct: (root, { id }) => {
      return new Promise((resolve, reject) => {
        Products.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
    },

    //New order resolver
    newOrder: (root, { input }) => {
      const newOrder = new Orders({
        pedido: input.pedido,
        total: input.total,
        fecha: new Date(),
        cliente: input.cliente,
        estado: 'PENDIENTE'
      });
      newOrder.id = newOrder._id;

      return new Promise((resolve, reject) => {
        newOrder.save(error => {
          if (error) reject(error);
          else resolve(newOrder);
        });
      });
    },
    //Update Order State
    updateOrder: (root, { input }) => {
      return new Promise((resolve, reject) => {
        // iterate and update quantity of products according the order state
        const { estado } = input;
        const instruction =
          estado === 'COMPLETADO'
            ? '-'
            : estado === 'CANCELADO'
            ? '+'
            : undefined;
        input.pedido.forEach(pedido => {
          //search the given product
          // console.log(pedido);
          Products.updateOne(
            // make use of the id given by the order and filter
            { _id: pedido.id },
            {
              //make use of the "$inc" function to decrement the quantity
              $inc: { stock: `${instruction}${pedido.cantidad}` }
            },
            // in case of error, throws it in console
            function(error) {
              if (error) return new Error(error);
            }
          );
        });
        Orders.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          error => {
            if (error) reject(error);
            else resolve('Se actualizo correctamente');
          }
        );
      });
    },

    // USERS RESOLVERS

    createUser: async (root, { user, nombre, password, rol }) => {
      const userExist = await Users.findOne({ user });
      if (userExist) {
        throw new ApolloError('Usuario ya existe');
      }
      const newUser = await new Users({ user, nombre, password, rol }).save();

      return 'Se ha creado correctamente';
    },

    authUser: async (root, { user, password }) => {
      const userName = await Users.findOne({ user });

      if (!userName) {
        throw new AuthenticationError('No se encontro usuario con ese nombre');
      }
      const correctPassword = await bcrypt.compare(password, userName.password);

      if (!correctPassword) {
        throw new AuthenticationError('Contraseña incorrecta');
      } else {
        return { token: generateToken(userName, process.env.SECRET, '1hr') };
      }
    }
  }
};
