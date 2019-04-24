import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Resume from './Resume';
import Heading from '../widgets/Heading';
import GenerateOrder from './GenerateOrder';
import Error from '../Alerts/Error';

export default class Content extends Component {
  state = { products: [], total: 0 };
  handleSelectProduct = products => {
    this.setState({
      products
    });
  };

  updateTotal = () => {
    // read state
    const { products } = this.state;

    //when prodcuts are 0
    if (products.length === 0) {
      this.setState({ total: 0 });
      return;
    }
    let newTotal = 0;

    // quantity x price
    products.map(product => (newTotal += product.quantity * product.precio));

    this.setState({
      total: newTotal
    });
  };

  updateQuantity = (quantity, index) => {
    // read state
    const { products } = this.state;
    //add quantity
    products[index].quantity = Number(quantity);

    // console.log(products);
    // console.log(index);
    // update quantity
    // validate
    // set state
    this.setState(
      {
        products
      },
      //after setting the quantity of products selected we update the total with  callback
      () => {
        this.updateTotal();
      }
    );
  };

  deleteProduct = id => {
    const { products } = this.state;

    const lefts = products.filter(product => product.id !== id);

    this.setState(
      {
        products: lefts
      },
      () => {
        this.updateTotal();
      }
    );
  };

  render() {
    const message =
      this.state.total < 0 ? <Error message='Las cantidades no pueden ser negativas' /> : '';
    return (
      <Fragment>
        <Heading size='h2'> Seleccionar Articulos</Heading>
        {message}
        <Select
          onChange={this.handleSelectProduct}
          options={this.props.products}
          isMulti
          components={Animated()}
          getOptionValue={options => options.id}
          getOptionLabel={options => options.nombre}
          value={this.state.products}
        />
        <Resume
          products={this.state.products}
          updateQuantity={this.updateQuantity}
          deleteProduct={this.deleteProduct}
        />
        <p className='font-weight-bold float-right mt-3'>
          Total: <span className='font-weight-normal'>${this.state.total} </span>
        </p>
        <GenerateOrder
          products={this.state.products}
          total={this.state.total}
          clientId={this.props.id}
        />
      </Fragment>
    );
  }
}
