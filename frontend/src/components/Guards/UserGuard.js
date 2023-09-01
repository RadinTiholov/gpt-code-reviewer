import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserGuard = ({children}) => {
    const { user } = useSelector((state) => state.auth);
    if (user) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />  
};

export default UserGuard;