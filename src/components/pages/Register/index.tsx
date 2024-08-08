import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { loginSchema } from '~/utilities/common/validator'
import { Link } from 'react-router-dom'
import { useRegister } from '~/utilities/hooks/useRegister'

const Register: React.FC = () => {
  const { onRegister } = useRegister()
  const onSubmit = async (values: { fullName: string; username: string; password: string }) => {
    await onRegister(values.fullName, values.username, values.password)
  }

  return (
    <div className='flex h-screen p-2 items-center justify-center bg-gray-100 '>
      <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-md'>
        <div className='mb-8 text-center'>
          <img src='./img/fb-icon.png' alt='Facebook' className='mx-auto w-32' />
        </div>
        <Formik
          initialValues={{ fullName: '', username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({}) => (
            <Form className='space-y-6'>
              <div>
                <Field
                  type='text'
                  name='fullName'
                  placeholder='Fullname'
                  className='w-full h-14 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
                <ErrorMessage name='fullname' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <Field
                  type='text'
                  name='username'
                  placeholder='Username'
                  className='w-full h-14 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
                <ErrorMessage name='username' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <Field
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='w-full h-14 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
                <ErrorMessage name='password' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <button
                  type='submit'
                  className='w-full h-14 text-lg font-medium p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600'
                >
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className='text-center mt-3'>
          <Link
            to='/login'
            className='block w-full h-14 text-lg font-medium p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
