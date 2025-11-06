import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './Page/HomePage.jsx'
import RegisterPage from './Page/RegisterPage.jsx'
import LoginPage from './Page/LoginPage.jsx'
import { useEffect, useState } from 'react'
import { setAuthUser, setIsLoading } from './slice/reduxIGlobleReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../backend/src/utils/axiosInstance.js'
import Loading from './components/Loading.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './Page/ProfilePage.jsx'
import AdminPage from './Page/AdminPage.jsx'
import PaymentSuccess from './Page/PaymentSuccess.jsx'
import PaymentCancel from './Page/PaymentCancel.jsx'
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
