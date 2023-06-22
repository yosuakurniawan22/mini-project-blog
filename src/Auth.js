import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("token") && localStorage.getItem('id')) {
        setIsAuthenticate(true);
      } else {
        setIsAuthenticate(false);
      }
    }, 2000);
  }, []);

  if (isAuthenticate === undefined) {
    return null;
  }

  if (!isAuthenticate) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Auth;