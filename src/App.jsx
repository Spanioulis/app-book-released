import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './routes/Register';
import './App.css';
import { UserContext } from './context/UserProvider';

function App() {
    const { user } = useContext(UserContext);

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
                {/* Hacer un Landing (public) -> path="/" */}
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
            </Routes>
        </>
    );
}

export default App;
