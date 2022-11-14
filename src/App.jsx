import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './routes/Register';
import './App.css';

function App() {
    const { user } = useContext(UserContext);
    console.log('Current user App: ', user);

    if (user === false) {
        // TODO -> "spinner" or screen loading
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>App</h1>
            <hr />
            <Navbar />
            <Routes>
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            {/* Home or Profile */}
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Hacer un Landing (public) */}
                <Route path="/" element={<Landing />} />
            </Routes>
        </>
    );
}

export default App;
