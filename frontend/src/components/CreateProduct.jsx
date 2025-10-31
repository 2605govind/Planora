import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../backend/src/utils/axiosInstance.js';
import Loading from '../components/Loading.jsx';
import { setAuthUser, setIsLoading } from '../slice/reduxIGlobleReducer.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProduct() {
  const navigate = useNavigate();
  const { isLoading, authUser } = useSelector((s) => s.gloable);
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    inventory_count: '',
  });


  // create product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    try {
        
        const res = await axiosInstance.post('/api/admin/products', newProduct);
        toast.success('Product created successfully!');
        setNewProduct({ name: '', price: '', inventory_count: '' });
    } catch (error) {
        toast.error(error.response?.data?.message || 'Product creation failed!');
    }
    dispatch(setIsLoading(false));
  };


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="p-8 w-xl">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Create New Product
          </h2>
          <form onSubmit={handleCreateProduct} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Inventory Count"
              value={newProduct.inventory_count}
              onChange={(e) =>
                setNewProduct({ ...newProduct, inventory_count: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Create Product
            </button>
          </form>
        </div>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
