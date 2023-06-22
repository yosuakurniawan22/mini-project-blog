import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Banner from '../components/Banner';
import Article from '../components/ArticleCard';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('DESC');
  const [newArticles, setNewArticles] = useState([]);

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
        let url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=${selectedSort}&page=${currentPage}`;
        if (selectedCategory) {
          url += `&id_cat=${selectedCategory}`;
        }
        const response = await axios.get(url);
        const { rows, listLimit, result } = response.data;
        setArticles(result);
        setTotalPages(Math.ceil(rows / listLimit));

        const newestResponse = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?sort=ASC'
        );
        const newestArticles = newestResponse.data.result;
        setNewArticles(newestArticles);
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
      <Banner articles={newArticles} />

      <section className="my-12">
        <h1 className="text-3xl font-bold text-center">Daftar Artikel</h1>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
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
  );
}