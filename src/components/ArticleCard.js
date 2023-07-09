import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

export default function ArticleCard({ article }) {
  const [liked, setLiked] = useState(false); 

  const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('id') !== null;

  useEffect(() => {
    // if there is no token dont fetch liked articles
    if (!isLoggedIn) return;
    const fetchLikeStatus = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog/pagLike`, { headers });

        const likedArticles = response.data.result;

        const isLiked = likedArticles.some((likedArticle) => likedArticle.BlogId === article.id);

        setLiked(isLiked); 
      } catch (error) {
        console.error('Error fetching liked articles', error);
      }
    };

    fetchLikeStatus();
  }, [article.id]);


  const handleLike = async () => {
    if (!liked) {
      try {
        const token = localStorage.getItem('token');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/blog/like`, {BlogId: article.id}, {headers});

        setLiked(true);
      } catch (error) {
        console.error('Error liking the article', error.response.data.message);
      }
    } else {
        try {
            const token = localStorage.getItem('token');

            const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            };

            await axios.delete(`${process.env.REACT_APP_API_URL}/blog/unlike/${article.id}`, {headers});

            setLiked(false);
        } catch (error) {
            console.error('Error unliking the article', error.response.data.message);
        }
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <img
        className="rounded-t-lg h-52 w-full object-cover"
        src={`${process.env.REACT_APP_API_PUBLIC_URL}${article.imageURL}`}
        alt={article.title}
      />

      <div className="flex flex-wrap gap-2 p-4">
        {article.Blog_Keywords.map((blog) => (
          <div className="border border-gray-500 px-3 py-1 rounded-full" key={blog.id}>
            {blog.Keyword.name}
          </div>
        ))}
      </div>

      <div className="p-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h5>

        <p className="text-gray-600 font-medium">by: {article.User.username}</p>

        <small className="text-zinc-600">{article.createdAt}</small>

        <p className="my-3 font-normal text-gray-500 dark:text-gray-400 break-words">{article.content}</p>

      </div>

      <div className='mt-auto px-4 py-4'>
        {isLoggedIn && (
          <button
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleLike}
        >
          {liked ? (
            <>
              <AiFillLike className="h-5 w-5 text-red-500" />
              <span>Liked</span>
            </>
          ) : (
            <>
              <AiOutlineLike className="h-5 w-5" />
              <span>Like</span>
            </>
          )}
        </button>
        )}
      </div>
    </div>
  );
}
