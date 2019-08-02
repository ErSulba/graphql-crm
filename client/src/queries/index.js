import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
  query getClients($limit: Int, $offset: Int) {
    getClients(limit: $limit, offset: $offset) {
      id
      nombre
      apellido
      empresa
    }
    totalClients
  }
`;

export const CLIENT_QUERY = gql`
  query consultClient($id: ID) {
    getClient(id: $id) {
      id
      nombre
      apellido
      empresa
      edad
      tipo
      emails {
        email
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query getProducts($limit: Int, $offset: Int, $stock: Boolean) {
    getProducts(limit: $limit, offset: $offset, stock: $stock) {
      id
      nombre
      precio
      stock
    }
    totalProducts
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID) {
    getProduct(id: $id) {
      nombre
      precio
      stock
    }
  }
`;

//Orders
export const GET_ORDERS = gql`
  query getOrders($cliente: String) {
    getOrders(cliente: $cliente) {
      id
      pedido {
        id
        cantidad
      }
      fecha
      cliente
      estado
      total
    }
  }
`;

export const TOP_CLIENTS = gql`
  {
    topClients {
      total
      cliente {
        nombre
        apellido
      }
    }
  }
`;
