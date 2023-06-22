import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FavoriteBlog() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('DESC');

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');

        let url = `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike?sort=${selectedSort}&page=${currentPage}`;
        if (selectedCategory) {
          url += `&id_cat=${selectedCategory}`;
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        const response = await axios.get(url, {headers});

        console.log(response);

        const { rows, listLimit, result } = response.data;
        setArticles(result);
        setTotalPages(Math.ceil(rows / listLimit));
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, [currentPage, selectedCategory, selectedSort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="p-8 overflow-x-hidden">
      <section className="my-12">
        <h1 className="text-3xl font-bold text-center">My Favorite Blog</h1>

        <div className="filter mt-5 flex gap-5 justify-center">
          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort">Urutkan:</label>
            <select
              id="sort"
              value={selectedSort}
              onChange={handleSortChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="ASC">Terlama</option>
              <option value="DESC">Terbaru</option>
            </select>
          </div>
        </div>

      </section>

      <section className="my-5">
        <div className="grid grid-cols-4 gap-5">
          {articles.length === 0 ? (
              <p className="text-gray-800">No articles found.</p>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="p-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {article.Blog.title}
                  </h5>
                  <small className="text-zinc-600">{article.createdAt}</small>
                  <p className="my-3 font-normal text-gray-500 dark:text-gray-400">
                    {article.Blog.content}
                  </p>
                </div>
              </div>
            ))
          )}
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
