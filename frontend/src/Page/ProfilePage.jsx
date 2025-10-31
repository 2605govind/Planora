import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import { setAuthUser } from '../slice/reduxIGlobleReducer.js';
import { toast, ToastContainer } from 'react-toastify';
import { User, CreditCard, Package } from 'lucide-react';
import Loading from '../components/Loading.jsx'
import { ClipLoader } from 'react-spinners';

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((s) => s.gloable);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [selectPlan, setSelectPlan] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      dispatch(setAuthUser(null));
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed!');
      console.log('Logout failed:', error);
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/api/plan/plans');
        console.log(res.data);
        setPlans(res.data || []);
      } catch (err) {
        toast.error('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleBuyPlan = async (planId) => {
    setSelectPlan(planId);
    setBuyLoading(true)
    try {
      const res = await axiosInstance.post('/api/paypal/orders', { planId });
      const approvalUrl = res.data.links.find((l) => l.rel === 'approve')?.href;
      if (approvalUrl) window.location.href = approvalUrl;
      toast.success('Plan purchased successfully!');
    } catch (err) {
      toast.error('Failed to buy plan');
    }
    setSelectPlan(null);
    setBuyLoading(false)
  };

  const handleSubscriptionPlan = async (billingPlanId, planId, plan) => {
    setSelectPlan(planId);
    setSubscriptionLoading(true)
    try {
      const res = await axiosInstance.post('/api/paypal/subscriptions/'+billingPlanId, plan);
      const approvalUrl = res.data.data.links.find((l) => l.rel === 'approve')?.href;
      console.log(res)
      if (approvalUrl) window.location.href = approvalUrl;
      toast.success('Plan subscription created successfully!');
    } catch (err) {
      toast.error('Failed to subscription');
    }
    setSelectPlan(null);
    setSubscriptionLoading(false)
  };

  // if(loading) {
  //   return <Loading/>
  // }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-950/90 backdrop-blur-md shadow-md text-white p-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
          onClick={() => navigate('/')}
        >
          Planora
        </h1>
        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <span className="flex items-center gap-1">
                <User size={18} /> {authUser.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <div>
        {authUser ? (
          <div className="p-6 max-w-6xl mx-auto flex flex-col gap-8">
            {/* Profile Card */}
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-blue-400">User Profile</h2>
              <p className="flex items-center gap-2"><User size={18} /> <strong>Username:</strong> {authUser.username}</p>
              <p className="flex items-center gap-2"><Package size={18} /> <strong>Role:</strong> {authUser.role}</p>
              {authUser.role === 'user' && (
                <>
                  <p className="flex items-center gap-2"><CreditCard size={18} /> <strong>Credits:</strong> {authUser.balance}</p>
                  <p className="flex items-center gap-2"><Package size={18} /> <strong>Current Plan:</strong> {authUser.plan || 'FREE'}</p>
                </>
              )}
            </div>


            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Available Plans</h3>
              {loading ? (
                <p>Loading plans...</p>
              ) : (
                <div className="flex flex-wrap gap-6 p-4">
                  {plans?.length === 0 ? (
                    <p>No plans found</p>
                  ) : (
                    plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`relative rounded-xl shadow-md p-6 flex flex-col items-center justify-between text-center transition-all duration-200 border w-50 ${authUser.planType === plan.planType
                          ? 'border-blue-500 bg-blue-950/50'
                          : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                          }`}
                      >

                        <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>

                        <p className="text-3xl font-bold text-red-500 my-3">
                          ${plan.price}{' '}
                          <span className="text-lg text-gray-400">/month</span>
                        </p>

                        <p className="text-gray-300 text-sm mb-2">
                          {plan.creditsPerMonth} credits per month
                        </p>

                        <p className="text-gray-400 text-sm mb-2">Type: {plan.planType}</p>

                        <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${plan.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {plan.isActive ? 'Active' : 'Inactive'}
                        </span>

                        {authUser.plan == plan.name ? (
                         <div>
                           <button
                            disabled
                            className="bg-gray-600 text-gray-400 px-3 py-1 rounded cursor-not-allowed w-full"
                          >
                            Current Plan
                          </button>
                          <button
                            disabled
                            className="bg-gray-600 text-gray-400 px-3 py-1 rounded cursor-not-allowed w-full mt-5"
                          >
                            Subscribe Plan
                          </button>
                         </div>
                        ) : (
                          authUser.role === 'user' && (
                            <div>
                              <button
                                onClick={() => handleBuyPlan(plan.id)}
                                disabled={buyLoading || subscriptionLoading}
                                className="flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-2 rounded w-full"
                              >
                                {selectPlan === plan.id && buyLoading && (
                                  <ClipLoader size={16} color="#fff" />
                                )}
                                <span className="pl-1">
                                  {authUser.planType === 'FREE' ? 'Buy Plan' : 'Change Plan'}
                                </span>
                              </button>

                              <button
                                onClick={() => handleSubscriptionPlan(plan.planId, plan.id, plan)}
                                disabled={buyLoading || subscriptionLoading}
                                className="flex flex-row items-center justify-center bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded w-full mt-5"
                              >
                                {selectPlan === plan.id && subscriptionLoading && (
                                  <ClipLoader size={16} color="#fff" />
                                )}
                                <span className="pl-1">
                                 Subscribe Plan
                                </span>
                              </button>
                            </div>
                          )

                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

          </div>

        ) : (
          <p className="p-6 text-gray-400 text-center">Please log in to view your profile.</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}
