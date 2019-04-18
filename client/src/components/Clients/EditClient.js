import React, { Component, Fragment } from 'react';
import { CLIENT_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import EditForm from './EditForm';
import Spinner from '../widgets/Spinner';

export default class EditClient extends Component {
  render() {
    //Taking the ID of the client

    const { id } = this.props.match.params;

    return (
      <Fragment>
        <h2 className='text-center'>Editar Cliente</h2>
        <div className='row justify-content-center'>
          <Query query={CLIENT_QUERY} variables={{ id }}>
            {({ loading, error, data, refetch }) => {
              if (loading) return <Spinner />;
              if (error) return `Error ${error.message}`;
              console.log(data);
              return <EditForm client={data.getClient} refetch={refetch} />;
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}
