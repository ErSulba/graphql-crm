import React, { Component, Fragment } from 'react';

import { NEW_CLIENT } from '../../mutations';
import { Mutation } from 'react-apollo';

export default class NewClient extends Component {
  state = {
    client: {
      nombre: '',
      apellido: '',
      empresa: '',
      edad: '',
      email: '',
      tipo: ''
    },
    error: false,
    emails: []
  };

  updateValue = e => {
    e.preventDefault();
    const value = e.target.value;
    const inputName = e.target.name;
    this.setState({
      client: {
        ...this.state.client,
        [inputName]: value
      }
    });
  };

  newField = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: '' }])
    });
  };

  removeField = i => () => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    });
  };

  //Creates a new array of emails in the state
  readField = i => e => {
    const newEmail = this.state.emails.map((email, index) => {
      if (i !== index) return email;
      return {
        ...email,
        email: e.target.value
      };
    });

    this.setState({
      emails: newEmail
    });
  };
  redirectToClientList = () => {
    this.props.history.push('/clients');
  };

  render() {
    const { error } = this.state;
    //Renders error in case the input is wrong
    let eResponse = error ? (
      <p className='alert alert-danger p-3 text-center'> Todos los campos son obligatorios</p>
    ) : (
      ''
    );
    //Renders emails input
    let emailsFields = this.state.emails.map((input, index) => (
      <div key={index} className='form-group col-md-12'>
        <label> Correo {index + 1}</label>
        <div className='input-group'>
          <input
            type='email'
            placeholder='Email'
            className='form-control'
            onChange={this.readField(index)}
          />
          <div className='input-group-append'>
            <button
              type='button'
              className='btn btn-danger another-class'
              onClick={this.removeField(index)}
            >
              &times; Eliminar
            </button>
          </div>
        </div>
      </div>
    ));
    return (
      <Fragment>
        <h2 className='text-center'>Nuevo Cliente</h2>
        {eResponse}
        <div className='row justify-content-center'>
          {/* Mutation: you need to pass the mutation here, and the form as a children of the mutaion */}
          <Mutation mutation={NEW_CLIENT} onCompleted={this.redirectToClientList}>
            {createClient => (
              <form
                className='col-md-8 m-3'
                onSubmit={e => {
                  e.preventDefault();
                  const { nombre, apellido, empresa, edad, tipo } = this.state.client;

                  const { emails } = this.state;

                  // Validating data submited by the user
                  if (
                    nombre === '' ||
                    apellido === '' ||
                    empresa === '' ||
                    edad === '' ||
                    tipo === ''
                  ) {
                    this.setState({
                      error: true
                    });
                    return;
                  }

                  this.setState({
                    error: false
                  });
                  const input = {
                    nombre,
                    apellido,
                    empresa,
                    edad: Number(edad),
                    emails,
                    tipo
                  };

                  createClient({ variables: { input } });
                }}
              >
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>Nombre</label>
                    <input
                      type='text'
                      name='nombre'
                      className='form-control'
                      placeholder='Nombre'
                      onChange={this.updateValue}
                    />
                  </div>
                  <div className='form-group col-md-6'>
                    <label>Apellido</label>
                    <input
                      type='text'
                      name='apellido'
                      className='form-control'
                      placeholder='Apellido'
                      onChange={this.updateValue}
                    />
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-12'>
                    <label>Empresa</label>
                    <input
                      type='text'
                      name='empresa'
                      className='form-control'
                      placeholder='Empresa'
                      onChange={this.updateValue}
                    />
                  </div>
                  {emailsFields}
                  <div className='form-group d-flex justify-content-center col-md-12'>
                    <button type='button' className='btn btn-warning' onClick={this.newField}>
                      + Agregar Email
                    </button>
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>Edad</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Edad'
                      name='edad'
                      onChange={this.updateValue}
                    />
                  </div>
                  <div className='form-group col-md-6'>
                    <label>Tipo Cliente</label>
                    <select className='form-control' name='tipo' onChange={this.updateValue}>
                      <option value=''>Elegir...</option>
                      <option value='PREMIUM'>PREMIUM</option>
                      <option value='BASICO'>BÁSICO</option>
                    </select>
                  </div>
                </div>
                <button type='submit' className='btn btn-success float-right'>
                  Agregar Cliente
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}
