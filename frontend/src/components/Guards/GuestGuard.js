import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const GuestGuard = ({children}) => {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />  
};

export default GuestGuard;