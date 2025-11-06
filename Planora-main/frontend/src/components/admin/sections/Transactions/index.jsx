import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../utils/axiosInstance';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export default function Transactions() {

  const { data: transactions, error, isLoading, refetch } = useQuery({
    queryKey: ["fetchAllTransactions"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/api/admin/transactions');
        return response.data.transactions ?? [];
      } catch (error) {
        const message = error?.response?.data?.message || "Server Error";
        toast.error(message);
        throw new Error(message);
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-blue-400">All Transactions</h2>
        <button
          onClick={() => {
            refetch()
            toast.success('Transactions refreshed successfully')
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
        ) : transactions?.length ? (
          transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-md hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-blue-400">
                  #{index + 1} {transaction?.paymentMethod?.toUpperCase()}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium 
                    ${transaction?.status === 'COMPLETED'
                      ? 'bg-green-500/20 text-green-400'
                      : transaction?.status === 'PENDING'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                    }`}
                >
                  {transaction?.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                <p><strong className="text-gray-400">Username:</strong> {transaction?.User.username}</p>
                <p><strong className="text-gray-400">Price:</strong> {transaction?.amount} {transaction?.currency}</p>
                <p><strong className="text-gray-400">Date:</strong> {dayjs(transaction?.createdAt).format('YYYY-MM-DD HH:mm')}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-16">
            <p>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
