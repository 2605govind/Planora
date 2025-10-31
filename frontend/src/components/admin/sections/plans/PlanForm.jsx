import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';


const planSchema = yup.object().shape({
  name: yup.string().required('Plan name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
  creditsPerMonth: yup
    .number()
    .typeError('Credits must be a number')
    .min(0, 'Credits cannot be negative')
    .required('Credits per month is required'),
  planType: yup
    .string()
    .oneOf(['FREE', 'BASIC', 'BUSINESS', 'ENTERPRISE'], 'Select a valid plan type')
    .required('Plan type is required'),
  isActive: yup.boolean(),
});

export default function PlanForm({ mode, plan }) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: plan || {},
    resolver: yupResolver(planSchema), 
  });

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      if (mode === 'create') {
        await axiosInstance.post('/api/paypal/plans', data);
        toast.success('Plan created!');
      } else {
        await axiosInstance.patch(`/api/paypal/plan/${plan.id}`, data);
        toast.success('Plan updated!');
      }
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Action failed');
    }
    setIsLoading(false)
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800/90 rounded-2xl shadow-2xl border border-gray-700 p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-400">
          {mode === 'create' ? 'Create Plan' : 'Update Plan'}
        </h2>

        <input
          {...register('name')}
          placeholder="Plan Name"
          className="bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <textarea
          {...register('description')}
          placeholder="Description"
          className="bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 w-full"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

        <input
          {...register('price')}
          placeholder="Price"
          min={0}
          type="number"
          className="no-spinner bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 w-full"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <input
          {...register('creditsPerMonth')}
          placeholder="Credits Per Month"
          min={0}
          type="number"
          className="no-spinner bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 w-full"
        />
        {errors.creditsPerMonth && <p className="text-red-500 text-sm">{errors.creditsPerMonth.message}</p>}

        <select
          {...register('planType')}
          className="bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Select Plan Type</option>
          <option value="FREE">FREE</option>
          <option value="BASIC">BASIC</option>
          <option value="BUSINESS">BUSINESS</option>
          <option value="ENTERPRISE">ENTERPRISE</option>
        </select>
        {errors.planType && <p className="text-red-500 text-sm">{errors.planType.message}</p>}

        <label className="flex items-center text-white">
          <input type="checkbox" {...register('isActive')} className="mr-2" />
          Active
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="flex flex-row items-center justify-center  bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold p-2 rounded-lg shadow-md"
        >
          
           {isLoading ? <ClipLoader size={24} color="#fff"/> : <span className='pl-1'>{mode === 'create' ? 'Create' : 'Update'}</span> }  
        </button>
      </form>
    </div>
  );
}
