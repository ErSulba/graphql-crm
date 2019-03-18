import React, { Component, Fragment } from 'react';
import { NEW_PRODUCT } from '../../mutations';
import { Mutation } from 'react-apollo';

const initialState = {
  nombre: '',
  precio: '',
  stock: ''
};

export class NewProduct extends Component {
  state = {
    ...initialState
  };

  cleanState = () => {
    this.setState({
      ...initialState
    });
  };

  updateState = e => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  validateForm = () => {
    const { nombre, precio, stock } = this.state;

    const noValid = !nombre || !precio || !stock;

    return noValid;
  };

  createNewProduct = (e, createProduct) => {
    e.preventDefault();

    //insert in database using the name of the resolver
    createProduct().then(data => {
      this.cleanState();

      //Redirect to products
      this.props.history.push('/productos');
    });
  };

  render() {
    const { nombre, precio, stock } = this.state;

    const input = {
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    };
    return (
      <Fragment>
        <h1 className='text-center mb-5'> Nuevo Producto</h1>
        <div className='row justify-content-center'>
          <Mutation mutation={NEW_PRODUCT} variables={{ input }}>
            {(createProduct, { loading, error, data }) => {
              return (
                <form className='col-md-8' onSubmit={e => this.createNewProduct(e, createProduct)}>
                  <div className='form-group'>
                    <label>Nombre:</label>
                    <input
                      type='text'
                      name='nombre'
                      className='form-control'
                      placeholder='Nombre del Producto'
                      onChange={this.updateState}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Precio:</label>
                    <div className='input-group'>
                      <div className='input-group-prepend'>
                        <div className='input-group-text'>$</div>
                      </div>
                      <input
                        type='number'
                        name='precio'
                        className='form-control'
                        placeholder='Precio del Producto'
                        onChange={this.updateState}
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Stock:</label>
                    <input
                      type='number'
                      name='stock'
                      className='form-control'
                      placeholder='stock del Producto'
                      onChange={this.updateState}
                    />
                  </div>
                  <button
                    type='submit'
                    className='btn btn-success float-right'
                    disabled={this.validateForm()}
                  >
                    Crear Producto
                  </button>
                </form>
              );
            }}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

export default NewProduct;
