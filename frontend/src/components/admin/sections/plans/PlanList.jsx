import { useEffect, useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance.js';
import { toast } from 'react-toastify';

export default function PlanList({ setMode, setSelectedPlan }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/api/plan/plans');
        setPlans(res.data || []);
      } catch (err) {
        toast.error('Failed to fetch plans');
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      await axiosInstance.delete(`/api/admin/plans/${id}`);
      toast.success('Plan deleted successfully!');
      setPlans((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast.error('Failed to delete plan');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {plans.length === 0 ? (
        <p>No plans found</p>
      ) : (
        plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p>Type: {plan.planType}</p>
            <p>Price: ${plan.price}</p>
            <p>Credits/Month: {plan.creditsPerMonth}</p>
            <p>Status: {plan.isActive ? 'Active' : 'Inactive'}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setMode('update');
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
