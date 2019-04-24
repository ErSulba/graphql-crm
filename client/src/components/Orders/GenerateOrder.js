import React from 'react';
import { Mutation } from 'react-apollo';
import { NEW_ORDER } from '../../mutations';
import { withRouter } from 'react-router-dom';

const validateOrder = (products, total) => {
  let noValid = !products || total <= 0;
  return noValid;
};

// NOTE: IDK why i have to destructure the history prop, but it won't work if i did not.
const GenerateOrder = ({ products, total, clientId, history }) => {
  return (
    <Mutation mutation={NEW_ORDER} onCompleted={() => history.push('/clients')}>
      {newOrder => (
        <button
          disabled={validateOrder(products, total)}
          type='button'
          className='btn btn-warning mt-4'
          onClick={e => {
            const productsInput = products.map(({ nombre, precio, stock, id, quantity }) => {
              //this is done because of spanglish, sorry.
              const newInput = {
                id,
                cantidad: quantity
              };
              return newInput;
            });
            const input = {
              pedido: productsInput,
              total,
              cliente: clientId
            };
            // console.log(input);
            // Execute the mutation
            newOrder({ variables: { input } });
          }}
        >
          Generar pedido
        </button>
      )}
    </Mutation>
  );
};
export default withRouter(GenerateOrder);
