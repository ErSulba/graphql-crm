import React, { Component } from 'react'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import customInput from 'components/Form/CustomInput'
import { Mutation } from 'react-apollo'
import { CREATE_USER } from 'mutations'
import Error from 'components/Alerts/Error'
import { withRouter } from 'react-router-dom'

const schema = yup.object().shape({
  user: yup
    .string()
    .required('se requiere el nombre')
    .trim('el nombre de usuario no puede llevar espacios')
    .min(3, 'el usuario debe incluir al menos 3 caracteres'),
  nombre: yup
    .string()
    .required('Escriba su nombre')
    .min(3, 'el nombre debe contener al menos 3 letras')
    .max(20, 'el nombre solo puede tener un maximo de 20 letras'),
  password: yup.string().required('se requiere password'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'las constraseñas deben coincidir'),
  rol: yup.string().required('debe elegir un tipo de rol')
})

class SignUp extends Component {
  render() {
    return (
      <>
        <h1 className='text-center mb-5'>Nuevo Usuario</h1>
        <Mutation mutation={CREATE_USER}>
          {(createUser, { loading, data, error }) => (
            <Formik
              initialValues={{
                user: '',
                nombre: '',
                password: '',
                passwordConfirm: '',
                rol: ''
              }}
              validationSchema={schema}
              onSubmit={({ user, password, nombre, rol }) => {
                createUser({ variables: { user, password, nombre, rol } })
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
                      <label>Nombre</label>
                      <Field
                        name='nombre'
                        placeholder='Nombre completo del usuario'
                        component={customInput}
                      />
                    </div>
                    <div className='form-row'>
                      <div className='form-group col-md-6'>
                        <label>Password</label>
                        <Field
                          type='password'
                          name='password'
                          component={customInput}
                          placeholder='Password'
                        />
                      </div>
                      <div className='form-group col-md-6'>
                        <label>Repetir Password</label>
                        <Field
                          type='password'
                          name='passwordConfirm'
                          component={customInput}
                          placeholder='Repetir Password'
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label>Rol</label>
                      <Field
                        as='select'
                        name='rol'
                        component={customInput}
                        placeholder='Tipo de rol'
                      >
                        <option value=''> Elegir...</option>
                        <option value='ADMIN'> Admin</option>
                        <option value='SELLER'> Vendedor </option>
                      </Field>
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
