import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
  query {
    getClients {
      id
      nombre
      apellido
      empresa
    }
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
