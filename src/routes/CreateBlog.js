import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray  } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  

  const initialValues = {
    title: '',
    content: '',
    country: '',
    CategoryId: '',
    keywords: [],
    file: null
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    country: Yup.string().required('Country is required'),
    CategoryId: Yup.string().required('Category ID is required'),
    keywords: Yup.array().min(1, 'At least one keyword is required'),
    file: Yup.mixed()
      .required('File is required')
      .test('fileType', 'Only image files are allowed', (value) => {
        if (!value) return false;
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      })
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    const data = {
      'title': values.title,
      'content': values.content,
      'country': values.country,
      'CategoryId': values.CategoryId,
      'keywords': values.keywords.join(' '),
    }

    formData.append('data', JSON.stringify(data));
    formData.append('file', values.file)

    try {
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      };

      const response = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/blog', formData, { headers });

      console.log(response);

      toast.success(response.data.message)
      resetForm();
    } catch (error) {
      toast.error('Error posting blog data', error?.response?.message);
      console.error('Error posting blog data', error);
    }

  };

  return (
    <div className="max-w-md mx-auto my-8">
      <ToastContainer />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue  }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" encType='multipart/form-data'>
          <h1 className="text-2xl font-bold mb-6">Create Blog</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="title" component="p" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <Field
              as="textarea"
              name="content"
              id="content"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
            <ErrorMessage name="content" component="p" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <Field
              type="text"
              name="country"
              id="country"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="country" component="p" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Kategori
            </label>
            <Field
              as="select"
              name="CategoryId"
              id="CategoryId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="CategoryId" component="p" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="keywords" className="block text-gray-700 text-sm font-bold mb-2">
              Keywords
            </label>
            <FieldArray name="keywords">
              {({ push, remove }) => (
                <div>
                  {values.keywords.map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Field
                        type="text"
                        name={`keywords[${index}]`}
                        className="hidden"
                      />
                      <Field
                        type="text"
                        name={`keywords[${index}]`}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2 text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add Keyword
                  </button>
                </div>
              )}
            </FieldArray>
            <ErrorMessage name="keywords" component="p" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
              Gambar
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/jpeg, image/png, image/gif"
              onChange={(event) => {
                setFieldValue('file', event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="file" component="p" className="text-red-500 text-xs italic" />
          </div>

          <hr />

          <div className="flex items-center justify-start mt-5">
            <button
              type="submit"
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Blog
            </button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;