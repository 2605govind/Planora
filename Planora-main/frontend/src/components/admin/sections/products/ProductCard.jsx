import { toast } from "react-toastify";
import axiosInstance from '../../../../utils/axiosInstance.js';
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ProductCard({ product, onEdit , setIsDeleted}) {
   const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true)
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    try {
      await axiosInstance.delete(`/api/admin/product/${product.id}`);
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product!");
    }
    setLoading(false)
    setIsDeleted(d => !d);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-all">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-300">{product.name}</h3>
        <p className="text-gray-500 mb-1">Credits: {product.price}</p>
        <p className="text-gray-500 mb-1">inventory: {product.inventory_count}</p>

      </div>


      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onEdit(product)}
          disabled={loading}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex flex-row items-center  bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors cursor-pointer"
        >
          {loading && <ClipLoader size={16} color="#fff"/>} <span className='pl-1'>Delete</span>
        </button>
      </div>
    </div>
  );
}
