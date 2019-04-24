import React, { Component, Fragment } from 'react';

export default class Product extends Component {
  state = {};
  render() {
    const { product } = this.props;
    // console.log(product);
    return (
      <Fragment>
        <tr>
          <td>{product.nombre}</td>
          <td>$ {product.precio}</td>
          <td>{product.stock}</td>
          <td>
            <input
              min='1'
              type='number'
              className='form-control'
              onChange={e => {
                if (e.target.value > product.stock) {
                  e.target.value = 0;
                }

                this.props.updateQuantity(e.target.value, this.props.index);
              }}
            />
          </td>
          <td>
            <button
              type='button'
              className='btn btn-danger font-weight-bold md-inline-block'
              onClick={e => this.props.deleteProduct(product.id)}
            >
              &times; Elminar
            </button>
          </td>
        </tr>
      </Fragment>
    );
  }
}
