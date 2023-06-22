import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one symbol'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
      phone: Yup.string()
      .matches(/^\d{10}$/, 'Invalid phone number')
      .required('Phone number is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/auth/', values);
      toast.success(response.data.message);

      resetForm();

      const token = response.data.token;
      navigate(`/verification/${token}`);
    } catch (error) {
      if(error.response) {
        const { data } = error.response;
        toast.error(data);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto rounded shadow-xl p-8 my-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <ToastContainer />
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="username" component="div" className="text-red-500 mt-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 mt-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block font-semibold mb-2">
              Phone Number
            </label>
            <Field
              type="text"
              id="phone"
              name="phone"
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 mt-2" />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
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
            <ErrorMessage name="password" component="div" className="text-red-500 mt-2" />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block font-semibold mb-2">
              Confirm Password
            </label>
            <Field
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <span
              className="password-toggle cursor-pointer absolute top-2 right-3"
              onClick={handleTogglePassword}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 mt-2"
            />
          </div>

          <p className='text-gray-500'>Already have Account? <Link to="/login" className='font-bold text-gray-600 hover:text-gray-700'>Login</Link></p>


          <button
            type="submit"
            className="bg-slate-700 text-white px-4 py-2 mt-4 rounded hover:bg-slate-800"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;