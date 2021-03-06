import React from 'react'
import { Link } from 'react-router-dom'
import CloseSession from './CloseSession'

const Header = ({ session }) => {
  const bar = session.getUser ? <NavigationAuth /> : <NavigationNoAuth />
  return (
    <nav className='navbar mb-4 navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex'>
      <div className='container'>{bar}</div>
    </nav>
  )
}

const NavigationNoAuth = () => (
  <h3 className='navbar-brand text-light font-weight-bold'>CRM</h3>
)

const NavigationAuth = () => (
  <>
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
        <li className='nav-item dropdown'>
          <button
            className='nav-link dropdown-toggle btn btn-block btn-success mt-3'
            data-toggle='dropdown'
          >
            Clientes
          </button>
          <div className='dropdown-menu' aria-labelledby='navegacion'>
            <Link to='/clients' className='dropdown-item'>
              Ver listado de Clientes
            </Link>
            <Link to='/clients/new' className='dropdown-item'>
              Nuevo cliente
            </Link>
          </div>
        </li>
        <li className='nav-item dropdown ml-md-3 my-3'>
          <button
            className='nav-link dropdown-toggle btn btn-block btn-success'
            data-toggle='dropdown'
          >
            Productos
          </button>
          <div className='dropdown-menu' aria-labelledby='navegacion'>
            <Link to='/products' className='dropdown-item'>
              Ver listado de Productos
            </Link>
            <Link to='/products/new' className='dropdown-item'>
              Nuevo Producto
            </Link>
          </div>
        </li>
        <CloseSession />
      </ul>
    </div>
  </>
)
export default Header
