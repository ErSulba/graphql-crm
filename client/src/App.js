import React, { Fragment } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

//Layouts
import Header from './components/layout/Header'
import Clients from './components/Clients/Clients'
import EditClient from './components/Clients/EditClient'
import NewClient from './components/Clients/NewClient'
import NewProduct from './components/Products/NewProduct'
import Products from './components/Products/Product'
import EditProduct from './components/Products/EditProduct'
import NewOrder from './components/Orders/NewOrder'
import ClientOrders from './components/Orders/ClientOrders'
import Panel from 'components/Panel'
import SignUp from 'components/Auth/SignUp'
import Login from 'components/Login'

//Components
import Session from 'components/Session'

const App = ({ refetch, session }) => {
  // console.log(session, 'session')
  const { getUser } = session
  const message = getUser ? (
    `Bienvenido ${getUser.user}`
  ) : (
    <Redirect to='/login' />
  )
  return (
    <Router>
      <Fragment>
        <Header session={session} />
        <div className='container'>
          <p className='text-right'>{message}</p>
          <Switch>
            <Route exact path='/clients' component={Clients} />
            <Route exact path='/clients/new' component={NewClient} />
            <Route exact path='/clients/edit/:id' component={EditClient} />
            <Route exact path='/products/new' component={NewProduct} />
            <Route exact path='/products/' component={Products} />
            <Route exact path='/products/edit/:id' component={EditProduct} />
            <Route exact path='/orders/new/:id' component={NewOrder} />
            <Route exact path='/orders/:id' component={ClientOrders} />
            <Route exact path='/panel' component={Panel} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route
              exact
              path='/login'
              render={() => <Login refetch={refetch} />}
            />
          </Switch>
        </div>
      </Fragment>
    </Router>
  )
}

const RootSession = Session(App)
export { RootSession }
