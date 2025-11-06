import { useEffect, useState } from 'react';
import axiosInstance from '../../../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard.jsx';

export default function ProductList({ setMode, setSelectedProduct }) {
  const [products, setProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/api/products');
        // console.log(res.data.products)
        setProducts(res.data.products || []);
      } catch (err) {
        toast.error('Failed to fetch products');
      }
    })();
  }, [isDeleted]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          setIsDeleted={setIsDeleted}
          onEdit={() => {
            setSelectedProduct(p);
            setMode('update');
          }}
        />
      ))}
    </div>
  );
}
