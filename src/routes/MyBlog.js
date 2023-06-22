import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyBlog() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
          `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=3&sort=ASC&page=${currentPage}`,
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

      await axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`, { headers });

      setCurrentPage(1);
      toast.success('Blog berhasil dihapus');
    } catch (error) {
      console.error('Error deleting blog', error);
      toast.error(error.response.data);
    }
  }

  return (
    <main className="p-8 overflow-x-hidden">
      <section className="my-12">
        <h1 className="text-3xl font-bold text-center">My Blog</h1>
      </section>

      <ToastContainer />
      
      <section className='my-5'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                    Image
                </th>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Content
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
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
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className='px-6 py-4 w-40'>
                      <img
                        className="rounded-t-lg h-28 w-28 object-cover"
                        src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
                        alt={article.title}
                      />
                    </td>
                    <td class="px-6 py-4 text-black">
                        {article.title}
                    </td>
                    <td class="px-6 py-4">
                        {article.content}
                    </td>
                    <td class="px-6 py-4">
                        {article.Category.name}
                    </td>
                    <td class="px-6 py-4">
                        <button href="#" className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-150 ease-in" onClick={() => handleDelete(article.id)}>Delete</button>
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
                className={`${
                  currentPage === page ? 'font-bold' : ''
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
