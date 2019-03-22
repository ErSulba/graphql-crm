import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_PRODUCT } from '../../mutations';
import { withRouter } from 'react-router-dom';

const initialState = {
  nombre: '',
  precio: '',
  stock: ''
};
class EditForm extends Component {
  state = {
    ...this.props.product.getProduct
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

  render() {
    const { nombre, precio, stock } = this.state;

    const input = {
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    };
    return (
      <Mutation
        mutation={UPDATE_PRODUCT}
        onCompleted={() => {
          this.props
            //Refetching data from graphql server
            .refetch()
            //After refetch is completed redirect to the list
            .then(() => {
              this.props.history.push('/productos');
            });
        }}
      >
        {updateProduct => (
          <form
            className='col-md-8'
            onSubmit={e => {
              e.preventDefault();
              const { id } = this.props;
              const { nombre, precio, stock } = this.state;

              const input = {
                id,
                nombre,
                precio: Number(precio),
                stock: Number(stock)
              };
              updateProduct({
                variables: { input }
              });
            }}
          >
            <div className='form-group'>
              <label>Nombre:</label>
              <input
                onChange={this.updateState}
                type='text'
                name='nombre'
                className='form-control'
                placeholder='Nombre del Producto'
                defaultValue={this.state.nombre}
              />
            </div>
            <div className='form-group'>
              <label>Precio:</label>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>$</div>
                </div>
                <input
                  onChange={this.updateState}
                  type='number'
                  name='precio'
                  className='form-control'
                  placeholder='Precio del Producto'
                  defaultValue={this.state.precio}
                />
              </div>
            </div>
            <div className='form-group'>
              <label>Stock:</label>
              <input
                onChange={this.updateState}
                type='number'
                name='stock'
                className='form-control'
                placeholder='stock del Producto'
                defaultValue={this.state.stock}
              />
            </div>
            <button
              disabled={this.validateForm()}
              type='submit'
              className='btn btn-success float-right'
            >
              Guardar Cambios
            </button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(EditForm);
