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
