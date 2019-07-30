import React from 'react';
import { GET_PRODUCT } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import ProductResume from './ProductResume';
import { UPDATE_ORDER } from 'mutations';

const Order = ({ cliente, pedido }) => {
  // State of order
  const { estado } = pedido;

  // Date of the order
  const fecha = new Date(Number(pedido.fecha));

  const borderClass =
    estado === 'PENDIENTE'
      ? 'border-light'
      : estado === 'CANCELADO'
      ? 'border-danger'
      : estado === 'COMPLETADO'
      ? 'border-success'
      : '';
  return (
    <div className='col-md-4'>
      <div className={`card mb-3 ${borderClass}`}>
        <div className='card-body'>
          <p className='card-text font-weight-bold '>
            Estado:
            <Mutation mutation={UPDATE_ORDER}>
              {updateOrder => (
                <select
                  className='form-control my-3'
                  value={pedido.estado}
                  onChange={e => {
                    const { id, fecha, total } = pedido;
                    const input = {
                      estado: e.target.value,
                      id,
                      //THIS IS MADNESS
                      pedido: pedido.pedido,
                      fecha,
                      total,
                      cliente
                    };
                    // console.log(input);
                    updateOrder({ variables: { input } });
                  }}
                >
                  <option value='PENDIENTE'>PENDIENTE</option>
                  <option value='COMPLETADO'>COMPLETADO</option>
                  <option value='CANCELADO'>CANCELADO</option>
                </select>
              )}
            </Mutation>
          </p>
          <p className='card-text font-weight-bold'>
            Pedido ID:
            <span className='font-weight-normal'> {pedido.id} </span>
          </p>
          <p className='card-text font-weight-bold'>
            Fecha Pedido:
            <span className='font-weight-normal'> {fecha.toLocaleString('es')}</span>
          </p>
          <p className='card-text font-weight-bold'>
            Total: $<span className='font-weight-normal'> {pedido.total} </span>
          </p>

          <h3 className='card-text text-center mb-3'>Artículos del pedido</h3>
          {pedido.pedido.map(producto => {
            return (
              <Query key={producto.id} query={GET_PRODUCT} variables={{ id: producto.id }}>
                {({ loading, error, data }) => {
                  if (loading) return 'Cargando ...';
                  if (error) return `Error: ${error.message}`;
                  return <ProductResume producto={data.getProduct} cantidad={producto.cantidad} />;
                }}
              </Query>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;
