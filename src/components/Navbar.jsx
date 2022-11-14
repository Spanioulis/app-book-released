import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await signOutUser();
        } catch ({ code }) {
            console.log(code);
        }
    };

    return (
        <div className="bg-stone-400">
            {user ? (
                <>
                    <NavLink to="/home">Home | </NavLink>
                    <button onClick={handleLogout}>Logout | </button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login | </NavLink>
                    <NavLink to="/register">Register | </NavLink>
                </>
            )}
        </div>
    );
};

export default Navbar;
