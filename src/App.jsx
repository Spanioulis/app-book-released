import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Register from './routes/Register';
import Profile from './routes/Profile';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
    const { user } = useContext(UserContext);

    if (user === false) {
        // TODO -> "spinner" or screen loading
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="bg-gray-200 dark:bg-stone-800 min-h-screen text-black dark:text-gray-300">
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route index element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Hacer un Landing (public) */}
                        <Route path="/landing" element={<Landing />} />
                    </Route>

                    {/* Crea componente 404notFound */}
                    {/* <Route path="*" element ={<NotFound />} */}
                </Routes>
            </div>
        </>
    );
}

export default App;
