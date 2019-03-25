import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components

//Layouts
import Header from './components/layout/Header';
import Clients from './components/Clients/Clients';
import EditClient from './components/Clients/EditClient';
import NewClient from './components/Clients/NewClient';
import NewProduct from './components/Products/NewProduct';
import Products from './components/Products/Product';
import EditProduct from './components/Products/EditProduct';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphqlErrors }) => {
    console.log('graphQLErrors', graphqlErrors);
    console.log('networkError', networkError);
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className='container'>
              <Switch>
                <Route exact path='/clients' component={Clients} />
                <Route exact path='/clients/new' component={NewClient} />
                <Route exact path='/clients/edit/:id' component={EditClient} />
                <Route exact path='/products/new' component={NewProduct} />
                <Route exact path='/products/' component={Products} />
                <Route exact path='/products/edit/:id' component={EditProduct} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
