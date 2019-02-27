import mongoose from 'mongoose';
import { Clients } from './db';
import { rejects } from 'assert';

class Client {
  constructor(id, { nombre, apellido, empresa, emails, edad, tipo, pedidos }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.empresa = empresa;
    this.emails = emails;
    this.edad = edad;
    this.tipo = tipo;
    this.pedidos = pedidos;
  }
}

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

    getClients: (root, { limit }) => {
      return Clients.find({}).limit(limit);
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
  },
};
