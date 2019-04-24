import mongoose from 'mongoose';
import { Clients, Products, Orders } from './db';
import { rejects } from 'assert';

export const resolvers = {
  Query: {
    getClient: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clients.findById(id, (error, client) => {
          if (error) rejects(error);
          else resolve(client);
        });
      });
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
          if (error) rejects(error);
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
        pedidos: input.pedidos,
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
        stock: input.stock,
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
        estado: 'PENDIENTE',
      });
      newOrder.id = newOrder._id;

      return new Promise((resolve, reject) => {
        // iterate and update quantity of products
        input.pedido.forEach(pedido => {
          //search the given product
          console.log(pedido);
          Products.updateOne(
            // make use of the id given by the order and filter
            { _id: pedido.id },
            {
              //make use of the "$inc" function to decrement the quantity
              $inc: { stock: -pedido.cantidad },
            },
            // in case of error, throws it in console
            function(error) {
              if (error) return new Error(error);
            }
          );
        });
        newOrder.save(error => {
          if (error) rejects(error);
          else resolve(newOrder);
        });
      });
    },
  },
};
