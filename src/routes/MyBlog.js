import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function MyBlog() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  useEffect(() => {
    // Fetch paginated blogs
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/blog/auth?sort=ASC&page=${currentPage}`,
          { headers }
        );
        const userId = localStorage.getItem('id');

        const { result, rows } = response.data;
        const filteredArticles = result.filter((article) => article.UserId === Number(userId));

        setArticles(filteredArticles);
        setTotalPages(Math.ceil(rows / 8)); // Assuming the listLimit is 8
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      await axios.patch(`${process.env.REACT_APP_API_URL}/blog/remove/${id}`, {}, { headers });

      // fetch blogs again
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/blog/auth?sort=ASC&page=${currentPage}`,
        { headers }
      );

      const userId = localStorage.getItem('id');
      const { result, rows } = response.data;
      const filteredArticles = result.filter((article) => article.UserId === Number(userId));

      setArticles(filteredArticles);
      setTotalPages(Math.ceil(rows / 8)); // Assuming the listLimit is 8

      // If using modal
      // props.setOpenModal(undefined);
      setCurrentPage(1);
      toast.success('Blog berhasil dihapus');
    } catch (error) {
      console.log('Error deleting blog', error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <main className="p-8 overflow-x-hidden">
      <section className="my-12">
        <h1 className="text-3xl font-bold text-center">My Blog</h1>
      </section>

      <ToastContainer />

      <section className='my-5'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr className="bg-white border-b dark:border-gray-700" >
                  <td colSpan={5} className='p-4 text-center'>No articles found.</td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={article.id}>
                    <td className='px-6 py-4 w-40'>
                      <img
                        className="rounded-t-lg h-28 w-28 object-cover"
                        src={`${process.env.REACT_APP_API_PUBLIC_URL}${article.imageURL}`}
                        alt={article.title}
                      />
                    </td>
                    <td className="px-6 py-4 text-black">
                      {article.title}
                    </td>
                    <td className="px-6 py-4">
                      {article.content}
                    </td>
                    <td className="px-6 py-4">
                      {article.Category.name}
                    </td>
                    <td className="px-6 py-4">
                      <Button className='bg-red-600 hover:bg-red-700' onClick={() => handleDelete(article.id)}>Delete</Button>
                      {/* <Button className='bg-red-600 hover:bg-red-700' onClick={() => props.setOpenModal('pop-up')}>Delete</Button> */}
                      {/* <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this blog?
                            </h3>
                            <div className="flex justify-center gap-4">
                              <Button className='bg-red-600 hover:bg-red-700' onClick={() => handleDelete(article.id)}>
                                Yes, I'm sure
                              </Button>
                              <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                                No, cancel
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${currentPage === page ? 'font-bold' : ''
                  } px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {page}
              </button>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  )
}
