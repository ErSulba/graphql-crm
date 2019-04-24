import React from 'react';

const Error = ({ message }) => {
  return <p className='alert alert-danger text-center p-2 mb-2'>{message}</p>;
};

export default Error;
