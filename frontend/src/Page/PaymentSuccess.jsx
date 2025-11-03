import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';


export default function PaymentSuccess() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('Processing your payment...');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = searchParams.get('token');
    const payerID = searchParams.get('PayerID');
    const mode = searchParams.get('mode');




    if (mode === "orders") {
      if (!token || !payerID) {
        setError('Missing token or PayerID in query params.');
        setLoading(false);
        return;
      }

      axiosInstance
        .get(`/api/paypal/orders/complete`, {
          params: { token, PayerID: payerID },
        })
        .then((response) => {
          console.log('Backend response:', response.data);
          setStatus('Payment completed successfully!');
          setLoading(false);

          setTimeout(() => {
            navigate('/');
          }, 6000);
        })
        .catch((err) => {
          console.error('Error completing payment:', err);
          setError('There was an error completing your payment.');
          setLoading(false);
        });
    } else if (mode === "subscriptions") {
      console.log("succuss")
      setTimeout(() => {
        navigate('/');
      }, 6000);

    }


  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-2">Payment Error</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="loader"></div>
        <p className="text-blue-600 mt-4 text-lg">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-semibold text-green-600 mb-2">Payment Status</h1>
      <p className="text-gray-800">{status}</p>
      <p className="text-gray-500 mt-2">Redirecting to home page...</p>
    </div>
  );
}
