import {Navigate, useLocation} from 'react-router'


export default Protected = ({children}) => {
    const location = useLocation();

    if(false) {
        return <Navigate to="/login" replace state={{from: location}}></Navigate>
    }

    return children;
}