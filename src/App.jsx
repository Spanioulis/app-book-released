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
import UploadBook from './routes/UploadBook';
import Search from './routes/Search';
import './App.css';
import './styles/loading.css';

function App() {
    const { user } = useContext(UserContext);

    if (user === false) {
        // TODO -> "spinner" or screen loading
        return <div className="spinner"></div>;
    }

    return (
        <>
            <div className="pattern-size-3 pattern-isometric pattern-bg-gray-200 pattern-gray-300 pattern-opacity-100 dark:pattern-cross dark:pattern-size-4 dark:pattern-stone-800 dark:pattern-bg-stone-900 min-h-screen text-black dark:text-gray-300">
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route index element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/uppload" element={<UploadBook />} />
                    </Route>

                    <Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Hacer un Landing (public) */}
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/search/:q" element={<Search />} />
                    </Route>

                    {/* Crea componente 404notFound */}
                    {/* <Route path="*" element ={<NotFound />} */}
                </Routes>
            </div>
        </>
    );
}

export default App;
