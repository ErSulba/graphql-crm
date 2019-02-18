import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTS_QUERY } from '../queries';

const Clients = () => (
  <Query query={CLIENTS_QUERY} pollInterval={1000}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      if (loading) return 'Cargando...';
      if (error) return `Error ${error.message}`;
      console.log(data.getClients);
      return (
        <Fragment>
          <h2 className='text-center'> Listado</h2>
          <ul className='list-group'>
            {data.getClients.map(item => (
              <li key={item.id} className='list-group-item'>
                <div className='row justify-content-between align-items-center'>
                  <div className='col-md-8 d-flex ustify-content-between align-items-center '>
                    {item.nombre} {item.apellido}
                  </div>
                  <div className='col-md-4 d-flex justify-content-end'>
                    <Link
                      to={`/cliente/editar/${item.id}`}
                      className='btn btn-success d-block d-md-inline-block'
                    >
                      Editar cliente
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export default Clients;
