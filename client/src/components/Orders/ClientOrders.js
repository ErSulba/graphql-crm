import React, { Fragment } from 'react';
import Heading from '../widgets/Heading';
import { Query } from 'react-apollo';
import { GET_ORDERS } from '../../queries';
import Spinner from '../widgets/Spinner';
import Order from './Order';

const ClientOrders = props => {
  const clientId = props.match.params.id;
  return (
    <Fragment>
      <Heading>Pedidos del Cliente</Heading>
      <div className='row'>
        <Query query={GET_ORDERS} variables={{ cliente: clientId }} pollInterval={500}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return <Spinner />;
            if (error) return `Error ${error.message}`;

            // console.log(data);
            return data.getOrders.map(order => (
              <Order
                key={order.id}
                //Spanglish ughh...
                pedido={order}
                cliente={clientId}
              />
            ));
          }}
        </Query>
      </div>
    </Fragment>
  );
};

export default ClientOrders;
