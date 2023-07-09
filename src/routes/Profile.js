import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/`, { headers });

        setProfileData(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchProfileData();
  }, []);

  // get initial letter from username
  let initial = profileData.username && profileData.username.charAt(0).toUpperCase();

  const initialValues = {
    username: profileData.username || '',
    email: profileData.email || '',
    phoneNumber: profileData.phone || '',
    file: null
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string().email('Invalid email'),
    phone: Yup.string()
      .matches(/^\d{10,12}$/, 'Invalid phone number'),
    file: Yup.mixed()
      .test('fileType', 'Only image files are allowed', (value) => {
        if (!value) return true;
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }).nullable()
  });

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      if (values.file) {
        const formData = new FormData();
        formData.append('file', values.file);

        const headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/profile/single-uploaded`, formData, { headers });

        toast.success("Foto berhasil diubah");
      }

      if (values.username && values.username !== '') {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/changeUsername`, {
          currentUsername: profileData.username,
          newUsername: values.username
        }, { headers });

        toast.success(response.data.message);

        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          navigate('/login');
        }, 1500)
      }

      if (values.email && values.email !== '') {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/changeEmail`, {
          FE_URL: process.env.REACT_APP_PUBLIC_URL,
          currentEmail: profileData.email,
          newEmail: values.email
        }, { headers });

        toast.success(response.data.message);

        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          navigate('/login');
        }, 1500)
      }

      if (values.phone && values.phone !== '') {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/auth/changePhone`, {
          currentPhone: profileData.phone,
          newPhone: values.phone
        }, { headers });

        toast.success(response.message.data);

        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          navigate('/login');
        }, 1500)
      }


    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto rounded shadow-xl p-8 my-8">
      <h1 className="text-2xl font-bold mb-4">Change Profile</h1>

      <ToastContainer />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className='mb-4 text-center'>
              <img src={profileData.imgProfile !== "" && profileData.imgProfile !== undefined && profileData.imgProfile !== null ? `${process.env.REACT_APP_API_PUBLIC_URL}${profileData.imgProfile}` : `https://dummyimage.com/1000x1000/000/fff&text=${initial}`} alt={profileData.username} className='h-28 w-28 border-2 border-violet-700 rounded-full object-cover mx-auto' />

              <input
                type="file"
                id="file"
                name="file"
                accept="image/jpeg, image/png, image/gif"
                onChange={(event) => {
                  setFieldValue('file', event.currentTarget.files[0]);
                }}
                className='mt-4'
              />
              <ErrorMessage name="file" component="p" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block font-semibold mb-2">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                placeholder={profileData.username}
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
                placeholder={profileData.email}
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
                placeholder={profileData.phone}
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 mt-2" />
            </div>

            <p className='text-gray-500'><Link to="/change-password" className='font-bold text-gray-600 hover:text-gray-700'>Change Password</Link></p>

            <button
              type="submit"
              className={`bg-slate-700 text-white px-4 py-2 mt-4 rounded hover:bg-slate-800 ${(!values.username && !values.email && !values.phone && !values.file) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!values.username && !values.email && !values.phone && !values.file}
            >
              Change Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
