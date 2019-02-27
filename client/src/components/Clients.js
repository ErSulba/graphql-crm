import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTS_QUERY } from '../queries';
import { DELETE_CLIENT } from '../mutations';
import Paginator from './Paginator';

class Clients extends Component {
  limit = 10;
  state = {
    paginator: {
      offset: 0,
      actual: 1
    }
  };

  previousPage = () => {
    this.setState({
      paginator: {
        offset: this.state.paginator.offset - this.limit,
        actual: this.state.paginator.actual - 1
      }
    });
  };

  nextPage = () => {
    console.log('next');
    this.setState({
      paginator: {
        offset: this.state.paginator.offset + this.limit,
        actual: this.state.paginator.actual + 1
      }
    });
  };
  render() {
    return (
      <Query
        query={CLIENTS_QUERY}
        pollInterval={1000}
        variables={{ limit: this.limit, offset: this.state.paginator.offset }}
      >
        {({ loading, error, data, startPolling, stopPolling }) => {
          if (loading) return 'Cargando...';
          if (error) return `Error ${error.message}`;
          console.log(data);

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

              <Paginator
                actual={this.state.paginator.actual}
                totalClients={data.totalClients}
                limit={this.limit}
                previousPage={this.previousPage}
                nextPage={this.nextPage}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Clients;
