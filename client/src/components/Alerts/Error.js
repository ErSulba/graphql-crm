import React from 'react'

const Error = ({ message }) => {
  // console.log(message)
  if (message.message) {
    message = message.message
    console.log(message)
  }
  return <p className='alert alert-danger text-center p-2 mb-2'>{message}</p>
}

export default Error
