import { useForm } from 'react-hook-form';
import axiosInstance from '../../../../utils/axiosInstance.js';
import { toast } from 'react-toastify';

export default function PlanForm({ mode, plan }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: plan || {},
  });

  const onSubmit = async (data) => {
    try {
      if (mode === 'create') {
        await axiosInstance.post('/api/admin/plan', data);
        toast.success('Plan created!');
      } else {
        await axiosInstance.patch(`/api/admin/plan/${plan.id}`, data);
        toast.success('Plan updated!');
      }
      reset();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
      <input {...register('name')} placeholder="Plan Name" className="border p-2 mb-3 w-full" />
      <textarea {...register('description')} placeholder="Description" className="border p-2 mb-3 w-full" />
      <input {...register('price')} placeholder="Price" type="number" className="border p-2 mb-3 w-full" />
      <input {...register('creditsPerMonth')} placeholder="Credits Per Month" type="number" className="border p-2 mb-3 w-full" />
      <select {...register('planType')} className="border p-2 mb-3 w-full">
        <option value="FREE">FREE</option>
        <option value="BASIC">BASIC</option>
        <option value="BUSINESS">BUSINESS</option>
        <option value="ENTERPRISE">ENTERPRISE</option>
      </select>
      <label className="flex items-center mb-3">
        <input type="checkbox" {...register('isActive')} className="mr-2" />
        Active
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {mode === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
}
