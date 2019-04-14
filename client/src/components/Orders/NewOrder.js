import React, { Component, Fragment } from 'react';
import ClientData from './ClientData';
import Heading from '../widgets/Heading';
import { Query } from 'react-apollo';
import { PRODUCTS_QUERY } from '../../queries';
import Spinner from '../widgets/Spinner';
import Content from './Content';

export default class NewOrder extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <Heading> Nuevo Pedido</Heading>
        <div className='row'>
          <div className='col-md-3'>
            <ClientData id={id} />
          </div>
          <div className='col-md-9'>
            <Query query={PRODUCTS_QUERY}>
              {({ loading, error, data }) => {
                if (loading) return <Spinner />;
                if (error) return `Error ${error.message}`;
                // console.log(data);
                return <Content products={data.getProducts} id={id} />;
              }}
            </Query>
          </div>
        </div>
      </Fragment>
    );
  }
}
