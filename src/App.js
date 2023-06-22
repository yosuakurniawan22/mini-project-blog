import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './error-page';
import Register from './routes/Register';
import Login from './routes/Login';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Verification from './routes/Verification';

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
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
