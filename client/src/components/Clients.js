import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTS_QUERY } from '../queries';
import { DELETE_CLIENT } from '../mutations';

const Clients = () => (
  <Query query={CLIENTS_QUERY} pollInterval={1000}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      if (loading) return 'Cargando...';
      if (error) return `Error ${error.message}`;

      return (
        <Fragment>
          <h2 className='text-center'> Listado</h2>
          <ul className='list-group'>
            {data.getClients.map(item => {
              const { id } = item;
              return (
                <li key={item.id} className='list-group-item'>
                  <div className='row justify-content-between align-items-center'>
                    <div className='col-md-8 d-flex ustify-content-between align-items-center '>
                      {item.nombre} {item.apellido}
                    </div>
                    <div className='col-md-4 d-flex justify-content-end'>
                      <Mutation mutation={DELETE_CLIENT}>
                        {deleteClient => (
                          <button
                            type='button'
                            className='btn btn-danger mr-2 d-block d-md-inline-block'
                            onClick={() => {
                              if (window.confirm('Seguro que deseas eliminar este cliente?')) {
                                deleteClient({
                                  variables: { id } // is has to be allways an object, otherwise it won't work
                                });
                              }
                            }}
                          >
                            &times; Elminar
                          </button>
                        )}
                      </Mutation>

                      <Link
                        to={`/cliente/editar/${item.id}`}
                        className='btn btn-success d-block d-md-inline-block'
                      >
                        Editar cliente
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export default Clients;
