import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';


export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('Processing cancellation...');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setError('Missing token in query params.');
      setLoading(false);
      return;
    }

    axiosInstance
      .get(`/api/paypal/cancel-order`, {
        params: { token },
      })
      .then((response) => {
        console.log('Backend cancel response:', response.data);
        setStatus('Payment has been cancelled successfully.');
        setLoading(false);

        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        console.error('Error cancelling payment:', err);
        setError('There was an error processing the cancellation.');
        setLoading(false);
      });
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Payment Cancellation Error
        </h1>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="loader"></div>
        <p className="text-red-600 mt-4 text-lg">Cancelling your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-semibold text-red-600 mb-2">Payment Cancelled</h1>
      <p className="text-gray-800">{status}</p>
      <p className="text-gray-500 mt-2">Redirecting to home page...</p>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Return to Home
      </button>
    </div>
  );
}
