import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { loginSchema } from '~/utilities/common/validator'
import { useLogin } from '~/utilities/hooks/useLogin'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  const { onLogin, onLoginGoogle } = useLogin()
  const onSubmit = async (values: { username: string; password: string }) => {
    await onLogin(values.username, values.password)
  }

  const onSubmitGoogle = async () => {
    await onLoginGoogle()
  }

  return (
    <div className='flex gap-32 h-screen p-2 items-center justify-center bg-gray-100 '>
      {/* <div className='text-start mb-96'>
        <h2 className='text-6xl font-bold text-blue-700'>facebook</h2>
        <p className='text-6xl font-light'>Sign in here</p>
      </div> */}
      <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-md'>
        <div className='mb-8 text-center'>
          <img src='./img/fb-icon.png' alt='Facebook' className='mx-auto w-32' />
        </div>
        <Formik initialValues={{ username: '', password: '' }} validationSchema={loginSchema} onSubmit={onSubmit}>
          {({}) => (
            <Form className='space-y-6'>
              <div>
                <Field
                  type='text'
                  name='username'
                  placeholder='Username'
                  className='w-full p-3 border h-14 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
                <ErrorMessage name='username' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <Field
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='w-full p-3 border h-14 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                />
                <ErrorMessage name='password' component='div' className='text-red-500 text-sm mt-1' />
              </div>
              <div>
                <button
                  type='submit'
                  className='h-14 w-full p-3 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
                >
                  Log in
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div>
          <button
            className='flex items-center text-lg font-medium justify-center gap-2 w-full mt-2 p-3 bg-gray-300 text-white rounded-lg hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-200'
            onClick={onSubmitGoogle}
          >
            <img src='/img/google.png' className='w-8 h-8' alt='' />
            <span>Continue sign in with Google</span>
          </button>
        </div>
        <div className='mt-4 text-center'></div>
        <hr className='my-6 border-gray-300' />
        <div className='text-center flex justify-center'>
          <Link
            to='/register'
            className='h-14 text-lg font-medium w-[200px] p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 text-center'
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
