import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTS_QUERY } from '../../queries';
import { DELETE_PRODUCT } from '../../mutations';
import { Link } from 'react-router-dom';
import Success from '../Alerts/Success';
import Paginator from '../Paginator';
import Spinner from '../widgets/Spinner';

export class Products extends Component {
  limit = 30;

  state = {
    paginator: {
      offset: 0,
      actual: 1
    },
    alert: {
      show: false,
      message: ''
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
  succesMessage = data => () => {
    console.log(data);
    this.setState(
      {
        alert: {
          show: true,
          message: data.deleteProduct
        }
      },
      //Clears the message after the set time has finished
      this.clearMessage()
    );
  };

  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        alert: {
          show: false,
          message: ''
        }
      });
    }, 3000);
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

        <Query
          query={PRODUCTS_QUERY}
          pollInterval={1000}
          variables={{ limit: this.limit, offset: this.state.paginator.offset }}
        >
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return <Spinner />;
            if (error) return `Error ${error.message}`;
            console.log(data);

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
                              //TODO: make that the alert works here
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
                            <Link to={`/products/edit/${id}`} className='btn btn-success'>
                              Editar Producto
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Paginator
                  actual={this.state.paginator.actual}
                  total={data.totalProducts}
                  limit={this.limit}
                  previousPage={this.previousPage}
                  nextPage={this.nextPage}
                />
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Products;
