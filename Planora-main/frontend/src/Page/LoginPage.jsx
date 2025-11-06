import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setAuthUser } from '../slice/reduxIGlobleReducer.js';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../backend/src/utils/axiosInstance.js';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s) => s.gloable);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Please fill all fields');
      return;
    }

    dispatch(setIsLoading(true));
    try {
      const res = await axiosInstance.post('/api/auth/login', { username, password });
      dispatch(setAuthUser(res.data.user));
      toast.success('Logged in successfully!');
      navigate('/'); // redirect after login
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
      console.log(err);
    }
    dispatch(setIsLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-950/80 backdrop-blur-md shadow-md text-white p-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
          onClick={() => navigate('/')}
        >
          Planora
        </h1>
      </nav>

      {/* Card */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-800/90 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
          <h2 className="mb-6 text-2xl font-bold text-center text-blue-400">Login</h2>

          <div className="flex flex-col gap-4">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-blue-400 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Button */}
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold p-2 rounded-lg shadow-md disabled:opacity-50"
              onClick={handleLogin}
              disabled={!(username&&password) || isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* <ToastContainer position="top-right" autoClose={3000} theme="dark" /> */}
    </div>
  );
}
