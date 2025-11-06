import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../../../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { Box, DollarSign, Layers } from 'lucide-react'; 


const productSchema = yup.object().shape({
  name: yup.string().required('Product name is required').min(2, 'At least 2 characters'),
  price: yup.number().typeError('Credits must be a number').min(0, 'Credits cannot be negative').required('Credits are required'),
  inventory_count: yup.number().typeError('Inventory must be a number').min(0, 'Inventory cannot be negative').required('Inventory count is required'),
});

export default function ProductForm({ mode, product, setMode }) {
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    defaultValues: product || {},
    resolver: yupResolver(productSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (mode === 'create') {
        await axiosInstance.post('/api/admin/products', data);
        toast.success('Product created');
      } else {
        await axiosInstance.put(`/api/admin/products/${product.id}`, data);
        toast.success('Product updated');
      }
      reset();
      setMode('list');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Operation failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800/90 rounded-2xl shadow-2xl border border-gray-700 p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-400">
          {mode === 'create' ? 'Create Product' : 'Update Product'}
        </h2>


        <div className="relative">
          <Box className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            {...register('name')}
            placeholder="Product Name"
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>


        <div className="relative">
          <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            {...register('price')}
            placeholder="Credits"
            type="number"
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>}
        </div>


        <div className="relative">
          <Layers className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            {...register('inventory_count')}
            placeholder="Inventory Count"
            type="number"
            className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          {errors.inventory_count && <p className="text-red-400 text-sm mt-1">{errors.inventory_count.message}</p>}
        </div>


        <button
          type="submit"
          disabled={!isValid || loading}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold p-2 rounded-lg shadow-md"
        >
          {loading && <ClipLoader size={16} color="#fff" />}
          <span className="pl-1">{mode === 'create' ? 'Create' : 'Update'}</span>
        </button>
      </form>
    </div>
  );
}
