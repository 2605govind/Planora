import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/home.jsx'
import RegisterPage from './pages/Auth/register.jsx'
import LoginPage from './pages/Auth/login.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './pages/profile.jsx'
import AdminPage from './pages/admin.jsx'
import PaymentSuccess from './pages/Payment/payment-success.jsx'
import PaymentCancel from './pages/Payment/payment-cancel.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const dispatch = useDispatch();
  const { isLoading, authUser } = useSelector((s) => s.gloable);
  const isAuth = Boolean(authUser);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ToastContainer position="top-right" autoClose={1000} theme="dark" />
        <Routes>
          <Route path='/register' element={isAuth ? <HomePage /> : <RegisterPage />}></Route>
          <Route path='/login' element={isAuth ? <HomePage /> : <LoginPage />}></Route>
          <Route path='/profile' element={isAuth ? <ProfilePage /> : <HomePage />}></Route>
          <Route path='/admin' element={isAuth ? (authUser.role === "admin") ? <AdminPage /> : <HomePage /> : <HomePage />}></Route>
          <Route path="/payment/success" element={isAuth ? <PaymentSuccess /> : <HomePage />} />
          <Route path="/payment/cancel" element={isAuth ? <PaymentCancel /> : <HomePage />} />
          <Route path='/' element={<HomePage />}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
