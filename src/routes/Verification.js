import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      await axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Verified Success');

      navigate('/');

    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Verification Page</h1>

      <ToastContainer />

      <button
        className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded"
        onClick={handleVerify}
      >
        Verify Account
      </button>
    </div>
  );
};

export default Verification;