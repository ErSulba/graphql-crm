import React, { Fragment } from 'react';
import Product from './Product';
import Heading from '../widgets/Heading';

const Resume = ({ products, updateQuantity, deleteProduct }) => {
  if (products.length === 0) return null;
  return (
    <Fragment>
      <Heading size='h2' className='my-5'>
        Resumen y Cantidades
      </Heading>
      <table className='table'>
        <thead className='bg-success text-light'>
          <tr className='font-weight-bold'>
            <th>Producto</th>
            <th>Precio</th>
            <th>Inventario</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <Product
              key={product.id}
              id={product.id}
              product={product}
              index={index}
              updateQuantity={updateQuantity}
              deleteProduct={deleteProduct}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Resume;
