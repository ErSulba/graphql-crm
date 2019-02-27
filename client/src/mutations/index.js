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
