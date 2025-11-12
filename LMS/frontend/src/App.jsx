import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/home.jsx'
import RegisterPage from './pages/Auth/register.jsx'
import LoginPage from './pages/Auth/login.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/landing-page.jsx'
import OtpPage from './pages/Auth/opt-page.jsx'

function App() {
  // const dispatch = useDispatch();
  // const {authUser } = useSelector((s) => s.gloable);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ToastContainer position="top-right" autoClose={1000} theme="dark" />
        <Routes>
          <Route path='/register' element={ <RegisterPage />}></Route>
          <Route path='/login' element={ <LoginPage />}></Route>
          <Route path='/verify-user' element={ <OtpPage />}></Route>
          <Route path='/' element={ <LandingPage />}></Route>
          {/* <Route path='/home' element={<HomePage />}></Route> */}
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
