import React from 'react';
import Slider from 'react-slick';
import { AiFillLike } from 'react-icons/ai';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Banner({ articles }) {
  const carouselSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="banner">
      <h2 className="text-3xl text-center py-4 font-bold">Most Favorite Blog</h2>
      <Slider {...carouselSettings}>
        {articles.map((article) => (
          <div key={article.id}>
            <img
              src={`${process.env.REACT_APP_API_PUBLIC_URL}${article.imageURL}`}
              alt={article.title}
              className="w-full h-96 object-cover relative"
            />

            <div className="absolute flex justify-center items-center h-full bottom-0 right-0 left-0 flex-col">
              <h3 className="px-6 py-2 bg-slate-800 text-white rounded">{article.title}</h3>
              <p className="max-w-4xl text-center mt-4 bg-slate-800 p-2 text-white">{article.content}</p>
              <div className="bg-slate-800 px-4 py-2 rounded flex gap-2 items-center text-white mt-4">
                <AiFillLike />
                <p>{article.total_fav}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
