import { useQuery } from '@tanstack/react-query';
import { getAllBillingPlans } from '../../../../utils/apis.js';
import axiosInstance from '../../../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import Loading from '../../../Loading.jsx';

export default function PlanList({ setMode, setSelectedPlan }) {
  const { data: plans, error, isLoading } = useQuery({
    queryKey: ['allBillingPlan'],
    queryFn: getAllBillingPlans,
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      await axiosInstance.delete(`/api/admin/plans/${id}`);
      toast.success('Plan deleted successfully!');
    } catch {
      toast.error('Failed to delete plan');
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {plans?.length === 0 ? (
        <p>No plans found</p>
      ) : (
        plans.map((plan) => (
          <div
            key={plan.id}
            className="relative rounded-xl shadow-md p-6 flex flex-col items-center justify-between text-center bg-transparent border border-gray-200 w-50"
          >
            {plan.isSpecial && (
              <div className="absolute top-2 left-2 transform -rotate-45 bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                Special Offer!
              </div>
            )}

            <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>

            <p className="text-3xl font-bold text-red-500 my-3">
              ${plan.price} <span className="text-lg text-gray-500">/month</span>
            </p>

            <p className="text-gray-600 text-sm mb-2">
              {plan.creditsPerMonth} credits per month
            </p>

            <p className="text-gray-600 text-sm mb-4">
             Type: {plan.planType}
            </p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                plan.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {plan.isActive ? 'Active' : 'Inactive'}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setMode('update');
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
