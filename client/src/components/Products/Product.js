import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTS_QUERY } from '../../queries';
import { DELETE_PRODUCT } from '../../mutations';
import { Link } from 'react-router-dom';
import Success from '../Alertas/Success';
export class Products extends Component {
  state = {
    alert: {
      show: false,
      message: ''
    }
  };
  render() {
    const {
      alert: { show, message }
    } = this.state;

    const alert = show ? <Success message={message} /> : '';
    return (
      <Fragment>
        <h1 className='text-center mb-5'>Productos</h1>

        {alert}

        <Query query={PRODUCTS_QUERY} pollInterval={1000}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return 'cargando...';
            if (error) return `Error ${error.message}`;

            return (
              <Fragment>
                <table className='table'>
                  <thead>
                    <tr className='table-primary'>
                      <th scope='col'>Nombre</th>
                      <th scope='col'>Precio</th>
                      <th scope='col'>Existencia</th>
                      <th scope='col'>Eliminar</th>
                      <th scope='col'>Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.getProducts.map(item => {
                      const { id } = item;

                      return (
                        <tr key={id}>
                          <td> {item.nombre} </td>
                          <td> {item.precio} </td>
                          <td> {item.stock} </td>
                          <td>
                            <Mutation
                              //Mutation used
                              mutation={DELETE_PRODUCT}
                              //Shows an alert when the mutation succeded
                              onCompleted={data => {
                                this.setState({
                                  alert: {
                                    show: true,
                                    message: data.deleteProduct
                                  }
                                });
                                console.log(data.deleteProduct);
                              }}
                            >
                              {deleteProduct => (
                                <button
                                  type='button'
                                  className='btn btn-danger'
                                  onClick={() => {
                                    if (window.confirm('Seguro que deseas eliminar el producto?')) {
                                      deleteProduct({
                                        variables: { id }
                                      });
                                    }
                                  }}
                                >
                                  &times; Eliminar
                                </button>
                              )}
                            </Mutation>
                          </td>
                          <td>
                            <Link to={`/producto/editar/${id}`} className='btn btn-success'>
                              Editar Producto
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Products;
