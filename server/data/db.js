// import mongoose from 'mongoose';
const mongoose = require('mongoose');
import bcrypt from 'bcrypt';

// Setting the global Promise Object to mongoose
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clients', { useNewUrlParser: true });

// Define clients Schema

const clientsSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  empresa: String,
  emails: Array,
  edad: Number,
  tipo: String,
  pedidos: Array
});

const Clients = mongoose.model('clients', clientsSchema);

// Products

const productsSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number
});

const Products = mongoose.model('products', productsSchema);

//Orders
const ordersSchema = new mongoose.Schema({
  pedido: Array,
  total: Number,
  fecha: Date,
  cliente: mongoose.Types.ObjectId,
  estado: String
});

const Orders = mongoose.model('orders', ordersSchema);

const usersSchema = new mongoose.Schema({
  user: String,
  nombre: String,
  password: String,
  rol: String
});
// Hook to create a hashed password
usersSchema.pre('save', function(next) {
  // check in case there's a change in the password
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next();
      this.password = hash;
      next();
    });
  });
});

const Users = mongoose.model('users', usersSchema);

export { Clients, Products, Orders, Users };
