import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
