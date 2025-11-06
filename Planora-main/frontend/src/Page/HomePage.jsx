import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../backend/src/utils/axiosInstance.js';
import Loading from '../components/Loading.jsx';
import { setAuthUser, setIsLoading } from '../slice/reduxIGlobleReducer.js';
import { toast, ToastContainer } from 'react-toastify';
import { ShoppingCart, User } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, authUser } = useSelector((s) => s.gloable);
    const [products, setProducts] = useState([]);
    const [allPurchase, setAllPurchase] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [section, setSection] = useState('products');
    const [purchaseProductId, setPurchaseProductId] = useState(null);


    useEffect(() => {
        const fetchAuthUser = async () => {
            setLoadingProducts(true);
            try {
                const res = await axiosInstance.get('/api/user');
                console.log(res.data.user)
                dispatch(setAuthUser(res.data.user));
            } catch (error) {
                console.log('Error fetching user:', error);
            }
            setLoadingProducts(false);
        };
        fetchAuthUser();
    }, []);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            try {
                const res = await axiosInstance.get('/api/products');
                setProducts(res.data.products || []);
            } catch (error) {
                toast.error('Failed to load products');
                console.log(error);
            } finally {
                setLoadingProducts(false);
            }
        };


        const fetchAllPurchaseProducts = async () => {
            setLoadingProducts(true);
            try {
                // console.log("fetchAllPurchaseProducts")
                const res = await axiosInstance.get('/api/user/allpurchase');
                // console.log(res.data.products)
                setAllPurchase(res.data.products || []);
            } catch (error) {
                toast.error('Failed to load purchase Products');
                console.log(error);
            } finally {
                setLoadingProducts(false);
            }
        };

        if (section === "products" && purchaseProductId === null) {
            fetchProducts();

        } else if (section === "all_purchase_products") {
            fetchAllPurchaseProducts()
        }
    }, [section, purchaseProductId]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/api/auth/logout');
            dispatch(setAuthUser(null));
            navigate('/login');
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error('Logout failed!');
            console.log('Logout failed:', error);
        }
    };

    const handlePurchase = async (productId) => {
        dispatch(setIsLoading(true));
        setPurchaseProductId(productId);
        try {
            const res = await axiosInstance.post(`/api/user/purchase/${productId}`);
            dispatch(setAuthUser(res.data.user));
            // console.log("purchase ", res.data.user);
            toast.success('Purchase successful!');
        } catch (error) {
            toast.error('Purchase failed!');
            console.log('Purchase error:', error.response?.data?.message || error.message);
        } finally {
            dispatch(setIsLoading(false));
            setPurchaseProductId(null);
        }
    };

    // if (isLoading || loadingProducts) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-950/90 backdrop-blur-md shadow-md text-white p-4 flex justify-between items-center">
                <h1
                    className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
                    onClick={() => navigate('/')}
                >
                    Planora
                </h1>
                <div className="flex items-center gap-4">
                    {authUser ? (
                        <>
                            <button
                                className="flex items-center gap-1 border py-1 px-3 rounded hover:bg-blue-600 transition"
                                onClick={() => navigate('/profile')}
                            >
                                <User size={16} /> Profile
                            </button>
                            {authUser?.role === "admin" && (
                                <button
                                    className="bg-blue-500 py-1 px-3 rounded hover:bg-blue-600 transition"
                                    onClick={() => navigate('/admin')}
                                >
                                    Admin
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 py-1 px-3 rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-500 py-1 px-3 rounded hover:bg-blue-600 transition"
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>

            {/* Sections */}
            <div className="flex gap-4 m-4">
                <button
                    className={`cursor-pointer px-3 py-1 rounded border ${section === 'products' ? 'bg-blue-400 text-gray-900' : ''}`}
                    onClick={() => setSection('products')}
                >
                    Products
                </button>
                {authUser?.role === "user" && <button
                    className={`cursor-pointer px-3 py-1 rounded border ${section === 'all_purchase_products' ? 'bg-blue-400 text-gray-900' : ''}`}
                    onClick={() => setSection('all_purchase_products')}
                >
                    All Purchase Products
                </button>}
            </div>

            {/* Products Grid */}
            {section === "products" &&
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length === 0 ? (
                        <p className="text-center col-span-full text-gray-400">No products found</p>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product.id}
                                
                                className="bg-gray-800 rounded-2xl shadow-2xl p-5 flex flex-col justify-between hover:bg-gray-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-300 mb-1">Credits: {product.price}</p>
                                <p className="text-gray-400 mb-3">Inventory: {product.inventory_count}</p>
                                {authUser?.role === "user" && <button
                                    onClick={() => handlePurchase(product.id)}
                                    disabled={isLoading}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition flex items-center justify-center gap-2"
                                >
                                    {purchaseProductId === product.id ? <ClipLoader size={16} color="#fff"/>: <ShoppingCart size={16}  />}  Purchase
                                </button>}
                            </div>
                        ))
                    )}
                </div>}



            {/* All_purchase_products Grid */}
            {section === "all_purchase_products" &&
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allPurchase.length === 0 ? (
                        <p className="text-center col-span-full text-gray-400">No Purchase found</p>
                    ) : (
                        allPurchase.map((purchase) => (
                            <div
                                key={purchase.name}
                                className="bg-gray-800 rounded-2xl shadow-2xl p-5 flex flex-col justify-between hover:bg-gray-700 transition"
                            >
                                <h3 className="text-lg font-semibold mb-2">{purchase.name}</h3>
                                <p className="text-gray-300 mb-3">Purchase products count: {purchase.purchase_count}</p>
                                <p className="text-gray-300 mb-1">Credits: {purchase.price}</p>

                            </div>
                        ))
                    )}
                </div>}
        </div>
    );
}
