import { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

export default function ProductSection() {
  const [mode, setMode] = useState('list'); // list | create | update
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <button onClick={() => setMode('list')} className={`px-3 py-1 rounded ${mode === 'list' && 'bg-blue-300'}`}>All Products</button>
        <button onClick={() => setMode('create')} className={`px-3 py-1 rounded ${mode === 'create' && 'bg-blue-300'}`}>Create Product</button>
      </div>

      {mode === 'list' && <ProductList setMode={setMode} setSelectedProduct={setSelectedProduct} />}
      {mode === 'create' && <ProductForm mode="create" setMode={setMode} />}
      {mode === 'update' && <ProductForm mode="update" product={selectedProduct} setMode={setMode} />}
    </div>
  );
}
