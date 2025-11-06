import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { setAuthUser } from "../../slice/reduxIGlobleReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
        >
            Logout
        </button>
    )
}

