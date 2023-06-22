import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword () {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
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
  });

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass', {
        password: values.password,
        confirmPassword: values.confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(response.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 1500)
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto rounded shadow-xl p-8 my-8">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <ToastContainer />
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
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

          <button
            type="submit"
            className="bg-slate-700 text-white px-4 py-2 mt-4 rounded hover:bg-slate-800"
          >
            Reset Password
          </button>
        </Form>
      </Formik>
    </div>
  );
};