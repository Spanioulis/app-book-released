import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <h1>App</h1>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
