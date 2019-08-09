import React from 'react'
import { Form } from 'react-bootstrap'

const CustomInput = ({
  field,
  form: { touched, errors },
  children,
  ...props
}) => (
  <div>
    <Form.Control
      isInvalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props}
    >
      {children}
    </Form.Control>

    {touched[field.name] && errors[field.name] && (
      <Form.Control.Feedback type='invalid'>
        {errors[field.name]}
      </Form.Control.Feedback>
    )}
  </div>
)

export default CustomInput
