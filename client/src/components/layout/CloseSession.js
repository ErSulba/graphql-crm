import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const closeUserSession = (client, history) => {
  localStorage.removeItem('token', '')
  // logout
  client.resetStore()
  // redirect
  history.push('/login')
}
const CloseSession = ({ history }) => {
  return (
    <ApolloConsumer>
      {client => {
        return (
          <button
            onClick={() => {
              closeUserSession(client, history)
            }}
            className='btn btn-light ml-md-2 '
          >
            Cerrar Sesíon
          </button>
        )
      }}
    </ApolloConsumer>
  )
}

export default withRouter(CloseSession)
