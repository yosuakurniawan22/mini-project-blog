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

function App() {
  return (
    <div className="App">
    
      <Router>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='/verification/:token' element={<Verification />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/my-blog' element={<MyBlog />} />
          <Route path='/favorite-blog' element={<FavoriteBlog />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
