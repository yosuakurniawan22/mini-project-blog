import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const response = await axios.put(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass',
        { email: values.email }
      );

      setLoading(false);
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      toast.error(error.response.data.err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-1/3 bg-white rounded shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="identifier" className="block font-semibold mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
          
            <button
              type="submit"
              className="bg-slate-700 text-white py-2 px-4 mt-4 rounded hover:bg-slate-800"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                'Send Reset Link Password'
              )}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
