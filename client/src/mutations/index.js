import gql from 'graphql-tag';

export const NEW_CLIENT = gql`
  mutation createClient($input: ClientInput) {
    createClient(input: $input) {
      id
      nombre
      apellido
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($input: ClientInput) {
    updateClient(input: $input) {
      id
      nombre
      empresa
      emails {
        email
      }
      edad
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

export const NEW_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      nombre
      stock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(id: $id)
  }
`;
