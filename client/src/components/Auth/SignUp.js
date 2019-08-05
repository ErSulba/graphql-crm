import React, { Component } from 'react'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import customInput from 'components/Form/CustomInput'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from 'mutations'
import Error from 'components/Alerts/Error'
import { withRouter } from 'react-router-dom'

const schema = yup.object().shape({
  user: yup.string().required('se requiere el nombre'),
  password: yup.string().required('se requiere password'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'las constraseñas deben coincidir')
})

class SignUp extends Component {
  render() {
    return (
      <>
        <h1 className='text-center mb-5'>Nuevo Usuario</h1>
        <Mutation mutation={CREATE_USER}>
          {(createUser, { loading, data, error }) => (
            <Formik
              initialValues={{ user: '', password: '', passwordConfirm: '' }}
              validationSchema={schema}
              onSubmit={({ user, password }) => {
                createUser({ variables: { user, password } })
                  .then(data => {
                    console.log(data)
                    this.props.history.push('/login')
                  })
                  .catch(err => console.log(err))
                // console.log(data)
              }}
            >
              {({ errors, touched }) => (
                <div className='row  justify-content-center'>
                  <Form className='col-md-8'>
                    {error && <Error message={error.message} />}
                    <div className='form-group'>
                      <label>Usuario</label>
                      <Field
                        name='user'
                        placeholder='Nombre de usuario'
                        component={customInput}
                      />
                    </div>
                    <div className='form-group'>
                      <label>Password</label>
                      <Field
                        type='password'
                        name='password'
                        component={customInput}
                        placeholder='Password'
                      />
                    </div>
                    <div className='form-group'>
                      <label>Repetir Password</label>
                      <Field
                        type='password'
                        name='passwordConfirm'
                        component={customInput}
                        placeholder='Repetir Password'
                      />
                    </div>

                    <button
                      type='submit'
                      className='btn btn-success float-right'
                      disabled={loading}
                    >
                      Crear Usuario
                    </button>
                  </Form>
                </div>
              )}
            </Formik>
          )}
        </Mutation>
      </>
    )
  }
}

export default withRouter(SignUp)
