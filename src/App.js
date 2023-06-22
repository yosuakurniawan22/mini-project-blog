import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './error-page';
import Register from './routes/Register';
import Login from './routes/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Verification from './routes/Verification';
import CreateBlog from './routes/CreateBlog';
import MyBlog from './routes/MyBlog';
import FavoriteBlog from './routes/FavoriteBlog';
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';
import Profile from './routes/Profile';
import ChangePassword from './routes/ChangePassword';
import Auth from './Auth';



function App() {
  return (
    <div className="App">
    
      <Router>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='/verification/:token' element={<Verification />} />
          <Route path='/verification-change-email/:token' element={<Verification />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
      
          
          <Route path='/create-blog' element={<Auth><CreateBlog /></Auth>} />
          <Route path='/my-blog' element={<Auth><MyBlog /></Auth>} />
          <Route path='/favorite-blog' element={<Auth><FavoriteBlog /></Auth>} />
          <Route path='/profile' element={<Auth><Profile /></Auth>} />
          <Route path='/change-password' element={<Auth><ChangePassword /></Auth>} />

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
