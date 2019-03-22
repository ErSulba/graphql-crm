import React, { Component, Fragment } from 'react';

import { Query } from 'react-apollo';
import { GET_PRODUCT } from '../../queries';
import EditForm from './EditForm';

export default class EditProduct extends Component {
  render() {
    //Takes the id to edit
    const { id } = this.props.match.params;
    // console.log(id);

    return (
      <Fragment>
        <h1 className='text-center'> Editar producto </h1>
        <div className='row justify-content-center'>
          <Query query={GET_PRODUCT} variables={{ id }}>
            {({ loading, error, data, refetch }) => {
              if (loading) return 'Cargando...';
              if (error) return `Error ${error.message}`;

              return <EditForm product={data} id={id} refetch={refetch} />;
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}
