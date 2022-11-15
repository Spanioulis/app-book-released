import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        //! Valorar si va a login o a la página "landing."
        return <Navigate to="/login" />;
    }
    return (
        <div className="container mx-auto">
            <Outlet />
        </div>
    );
};

export default ProtectedRoute;
