import mongoose from 'mongoose';

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
  pedidos: Array,
});

const Clients = mongoose.model('clients', clientsSchema);

// Products

const productsSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number,
});

const Products = mongoose.model('products', productsSchema);

//Orders
const ordersSchema = new mongoose.Schema({
  pedido: Array,
  total: Number,
  fecha: Date,
  cliente: String,
  estado: String,
});

const Orders = mongoose.model('orders', ordersSchema);

export { Clients, Products, Orders };
