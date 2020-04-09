import React from 'react'
import { Styles } from './styles/Styles'
import { Formik, useField, Form } from 'formik'
import * as Yup from 'yup'

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField(props, 'checkbox');

  return (
    <>
      <label className='checkbox'>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const App = () => {
  return (
    <Styles>
      <Formik
        initialValues={{
          name: '',
          email: '',
          acceptedTerms: false,
          specialPower: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions'),
          specialPower: Yup.string()
            .oneOf(['flight', 'invisibility', 'wealthy bat guy', 'other'], 'Invalid Special Power')
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            resetForm();
            setSubmitting(false)
          }, 3000)
        }}
      >
        {props => (
          <Form>
            <h1>Sign up</h1>
            <CustomTextInput label='Name' name='name' type='text' placeholder="Romain" />
            <CustomTextInput label='Email' name='email' type='text' placeholder="romain.rtestard@gmail.com" />
            <CustomSelect label="Special Power" name="specialPower">
              <option value="">Select a Special Power</option>
              <option value="flight">flight</option>
              <option value="invisibility">invisibility</option>
              <option value="wealthy bat guy">wealthy bat guy</option>
              <option value="other">other</option>
            </CustomSelect>
            <CustomCheckBox name="acceptedTerms">
              I accept the terms and conditions
            </CustomCheckBox>
            <button type="submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default App
