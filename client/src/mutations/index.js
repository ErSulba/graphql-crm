import gql from 'graphql-tag'

export const NEW_CLIENT = gql`
  mutation createClient($input: ClientInput) {
    createClient(input: $input) {
      id
      nombre
      apellido
    }
  }
`

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
`

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`

export const NEW_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      nombre
      stock
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(id: $id)
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductInput) {
    updateProduct(input: $input) {
      nombre
      precio
      stock
    }
  }
`

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`

export const UPDATE_ORDER = gql`
  mutation updateOrder($input: OrderInput) {
    updateOrder(input: $input)
  }
`

export const CREATE_USER = gql`
  mutation createUser($user: String!, $password: String!) {
    createUser(user: $user, password: $password)
  }
`
