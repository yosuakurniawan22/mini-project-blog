import React from 'react';

export default function ArticleCard({ article }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg h-52 w-full object-cover"
        src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}
        alt={article.title}
      />

      <div className="flex gap-2 p-4">
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

        <p className="my-3 font-normal text-gray-500 dark:text-gray-400">{article.content}</p>
      </div>
    </div>
  );
}