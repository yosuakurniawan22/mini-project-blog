import React from 'react';
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">The Mini Blog</h3>
            <p className="text-gray-600">Subscribe to Newsletter</p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                type="submit"
                className="bg-slate-700 text-white py-2 px-4 rounded-r-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              <FaTwitter className='text-xl' />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              <AiFillInstagram className='text-xl' />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <AiFillFacebook className='text-xl' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;