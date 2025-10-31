import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

export default function ProductForm({ mode, product , setMode }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: product || {} });
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      toast.error('Operation failed');
    }
    setLoading(false);
    setMode('list')
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto"
    >
      {/* Product Name */}
      <div className="mb-3">
        <label className="block text-gray-700 font-medium mb-1">Product Name</label>
        <input
          {...register('name')}
          placeholder="Product name"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="block text-gray-700 font-medium mb-1">Credits</label>
        <input
          {...register('price')}
          placeholder="Credits"
          type="number"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Inventory Count */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Inventory Count</label>
        <input
          {...register('inventory_count')}
          placeholder="Inventory count"
          type="number"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="flex flex-row items-center  bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        disabled={loading}
      >
        {loading && <ClipLoader size={16} color="#fff"/>} <span className='pl-1'>{mode === 'create' ? 'Create' : 'Update'}</span>
      </button>
    </form>
  );
}
