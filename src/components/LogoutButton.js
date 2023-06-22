import React from 'react';

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

   
    window.location.href = '/login';
  };

  return (
    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>
      Logout
    </button>
  );
}