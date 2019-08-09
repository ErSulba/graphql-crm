import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { AUTH_USER } from 'mutations'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from 'components/Form/CustomInput'

const initialValues = {
  usuario: '',
  password: ''
}

const schema = yup.object({
  user: yup.string().required('escriba su nombre de usuario'),
  password: yup.string().required('escriba su contraseña')
})

const Login = props => {
  return (
    <Fragment>
      <h1 className='text-center mb-5'>Iniciar Sesión</h1>
      <div className='row  justify-content-center'>
        <Mutation
          mutation={AUTH_USER}
          // onCompleted={data => console.log(data, 'token')}
        >
          {(authUser, { loading, error, data }) => {
            return (
              <Formik initialValues={initialValues} validationSchema={schema}>
                {({
                  errors,
                  touched,
                  values: { user, password },
                  isValid,
                  isSubmitting
                }) => (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      authUser({ variables: { user, password } }).then(
                        async ({ data }) => {
                          // extract the token from the mutation
                          const {
                            authUser: { token }
                          } = data
                          // seting the token in the local storage
                          localStorage.setItem('token', token)
                          // execute query
                          await props.refetch()

                          // redirect
                          setTimeout(() => {
                            props.history.push('/panel')
                          }, 3000)
                        }
                      )
                    }}
                    className='col-md-8'
                  >
                    {/* {error && <Error error={error} />} */}

                    <div className='form-group'>
                      <label>Usuario</label>
                      <Field
                        type='text'
                        name='user'
                        className='form-control'
                        placeholder='Nombre Usuario'
                        component={CustomInput}
                      />
                    </div>
                    <div className='form-group'>
                      <label>Password</label>
                      <Field
                        type='password'
                        name='password'
                        className='form-control'
                        placeholder='Password'
                        component={CustomInput}
                      />
                    </div>

                    <button
                      disabled={loading || !isValid || isSubmitting}
                      type='submit'
                      className='btn btn-success float-right'
                    >
                      Iniciar Sesión
                    </button>
                  </form>
                )}
              </Formik>
            )
          }}
        </Mutation>
      </div>
    </Fragment>
  )
}

export default withRouter(Login)
