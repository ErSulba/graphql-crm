import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className='navbar mb-4 navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex'>
    <div className='container'>
      <Link to='/' className='navbar-brand text-light font-weight-bold'>
        CRM
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navegacion'
        aria-controls='navegacion'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navegacion'>
        <ul className='navbar-nav ml-auto text-right'>
          <li className='nav-item active'>
            <Link to='/cliente/nuevo' className='btn btn-success mr-3'>
              Nuevo Cliente
            </Link>
            <Link to='/producto/nuevo' className='btn btn-success'>
              Nuevo Producto
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
