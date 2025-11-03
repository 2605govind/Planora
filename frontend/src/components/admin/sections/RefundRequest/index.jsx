import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../utils/axiosInstance';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useGet } from '../../../../hooks/useGet.js'
import { usePost } from '../../../../hooks/usePost.js'
import { useEffect } from 'react';
import { useState } from 'react';

export default function RefundRequest() {
  const [selectedId, setSelectedId] = useState(null)

  // get all refund request
  const { data: refundReq, error: refundReqError, isLoading, refetch } = useGet('/api/admin/refund/panding');
  const refundRequests = refundReq?.data || [];


  // accept request
  const { mutate: refundApproveMutate, error: refundApproveError, isPending: approvePanding } = usePost('/api/paypal/refund/approve');

  // console.log("refundRequests", refundRequests)
  useEffect(() => {
    if (refundReqError) {
      console.log("refundReqError error ", refundReqError?.response?.data?.message)
      toast.error(refundReqError?.response?.data?.message || "Server Error")
    }
    if (refundApproveError) {
      console.log("refundApproveError error ", refundApproveError?.response?.data?.message)
      toast.error(refundApproveError?.response?.data?.message || "Server Error")
    }
  }, [refundReqError, refundApproveError])

  function handleRefundApprove(refundReq) {
    setSelectedId(refundReq.id)
    const OrderId = refundReq.orderId;
    const amount = refundReq.amount;
    refundApproveMutate({ OrderId, amount })
    console.log("handleRefundApprove", refundReq)

    // setSelectedId(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-blue-400">💳 All Refund Requests</h2>
        <button
          onClick={() => {
            refetch()
            toast.success('Refund request refreshed successfully')
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader size={40} color="#3B82F6" />
          </div>
        ) : refundRequests?.length ? (
          refundRequests.map((refundReq, index) => (
            <div
              key={refundReq.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-md hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-blue-400">
                  #{index + 1} — {refundReq?.paymentMethod?.toUpperCase()}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium 
                    ${refundReq?.status === 'COMPLETED'
                      ? 'bg-green-500/20 text-green-400'
                      : refundReq?.status === 'PENDING'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                >
                  {refundReq?.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <p><strong className="text-gray-400">User ID:</strong> {refundReq?.User?.username}</p>
                <p><strong className="text-gray-400">Price:</strong> {refundReq?.amount}$</p>
                <p><strong className="text-gray-400">Date:</strong> {dayjs(refundReq?.createdAt).format('YYYY-MM-DD HH:mm')}</p>
              </div>
              <div>
                <p><strong className="text-gray-400">Balance:</strong> {refundReq?.User.balance} Credits</p>
                <p><strong className="text-gray-400">Plan Name:</strong> {refundReq?.User.plan}</p>
                <p><strong className="text-gray-400">Plan start date: </strong>{dayjs(refundReq?.User.plan_start_date).format('YYYY-MM-DD HH:mm')} </p>
              </div>
              <button
                onClick={() => handleRefundApprove(refundReq)}
                disabled={approvePanding}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 mt-5"
              >
       
                {selectedId === refundReq.id && approvePanding && (
                  <ClipLoader size={16} color="#fff" />
                )}
                <span className="pl-1">
                  Approve
                </span>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-16">
            <p>No Refund Requests found 💤</p>
          </div>
        )}
      </div>
    </div>
  );
}


