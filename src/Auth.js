import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('id') !== null;

  if (isLoggedIn === undefined) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Auth;