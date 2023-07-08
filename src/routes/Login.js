import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    identifier: '',
    password: ''
  };

  const validationSchema = Yup.object({
    identifier: Yup.string().required('Field is Required'),
    password: Yup.string().required('Password is Required')
  });

  const handleSubmit = async  (values) => {
    try {
      const { identifier } = values;
      const isEmail = /^\S+@\S+\.\S+$/.test(identifier);
      const isPhoneNumber = /^\d+$/.test(identifier);
      
      const body = {
        username: isEmail || isPhoneNumber ? '' : identifier,
        email: isEmail ? identifier : '',
        phone: isPhoneNumber ? identifier : '',
        password: values.password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        body
      );

      const token = response.data.data.token;

      localStorage.setItem('token', token);
      // localStorage.setItem('id', response.data.isAccountExist.id);
      localStorage.setItem('id', response.data.data.id);

      toast.success(response.data.message);

      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 xl:p-8">
      <div className="w-full lg:w-1/3 bg-white rounded shadow-xl p-4 xl:p-8">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="identifier" className="block font-semibold mb-2">
                Email or Username or Phone:
              </label>
              <Field
                type="text"
                id="identifier"
                name="identifier"
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="identifier"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
            
            <div className="mb-4 relative">
              <label htmlFor="password" className="block font-semibold mb-2">
                Password:
              </label>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
              <span
                className="password-toggle cursor-pointer absolute top-2 right-3"
                onClick={handleTogglePassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>

            <p className='text-gray-500'><Link to="/forgot-password" className='text-gray-600 hover:text-gray-700 hover:underline'>Forgot Password</Link></p>

            <hr className='my-2' />

            <p className='text-gray-500'>Doesn't have Account? <Link to="/register" className='font-bold text-gray-600 hover:text-gray-700'>Register</Link></p>

            <button
              type="submit"
              className="bg-slate-700 text-white py-2 px-4 mt-4 rounded hover:bg-slate-800"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
