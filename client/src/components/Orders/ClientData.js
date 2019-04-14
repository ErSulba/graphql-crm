import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENT_QUERY } from '../../queries';
import Spinner from '../widgets/Spinner';
import Heading from '../widgets/Heading';
const ClientData = ({ id }) => {
  return (
    <Fragment>
      <Heading size='h2' className='mb-3'>
        Resumen de cliente
      </Heading>
      <Query query={CLIENT_QUERY} variables={{ id }} pollInterval={500}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return <Spinner />;
          if (error) return `Error ${error.message}`;

          // console.log(data.getClient);
          const { nombre, apellido, emails, edad, empresa, tipo } = data.getClient;

          return (
            <ul className='list-unstyled my-5'>
              <li className='border font-weight-bold p-2'>
                Nombre:<span className='font-weight-normal'> {nombre}</span>
              </li>
              <li className='border font-weight-bold p-2'>
                Apellido:<span className='font-weight-normal'> {apellido}</span>
              </li>
              <li className='border font-weight-bold p-2'>
                emails:
                <span className='font-weight-normal'> {emails.map(item => ` ${item.email} `)}</span>
              </li>
              <li className='border font-weight-bold p-2'>
                edad:<span className='font-weight-normal'> {edad}</span>
              </li>
              <li className='border font-weight-bold p-2'>
                empresa:<span className='font-weight-normal'> {empresa}</span>
              </li>
              <li className='border font-weight-bold p-2'>
                tipo:<span className='font-weight-normal'> {tipo}</span>
              </li>
            </ul>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default ClientData;
