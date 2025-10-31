import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../../backend/src/utils/axiosInstance.js';
import { toast, ToastContainer } from 'react-toastify';
import { setAuthUser, setIsLoading } from '../slice/reduxIGlobleReducer.js';
import { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const schema = yup.object({
  username: yup.string().min(3, 'At least 3 characters').max(20, 'Max 20 Characters allowed').required('Username is required'),
  password: yup.string().min(6, 'At least 6 characters').max(30, 'Max 30 Characters allowed').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()~`+=_\-[\]{}|;:'",.<>?/\\])(?!.*\s).{6,20}$/,
    'Password must contain uppercase, lowercase, number, and special character'
  ).required('Password is required'),
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s) => s.gloable);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    dispatch(setIsLoading(true));
    try {
      const res = await axiosInstance.post('/api/auth/register', data);
      const { success, message } = res.data;

      if (success) {
        toast.success(message || 'Registered successfully!');
        dispatch(setAuthUser(res.data.user));
      } else {
        toast.error(message || 'Registration failed');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Server error');
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
          <h2 className="mb-6 text-2xl font-bold text-center text-blue-400">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  {...register('username')}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  placeholder="Username"
                  autoComplete="off"
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  {...register('password')}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-blue-400 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold p-2 rounded-lg shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
