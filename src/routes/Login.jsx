import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Login = () => {
    const [email, setEmail] = useState('pani@pani.com');
    const [password, setPassword] = useState('123456');

    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('probando submit', email, password);

        try {
            await loginUser(email, password);
            navigate('/home');
            console.log('Usuario logeado');
        } catch ({ code }) {
            // TODO -> setTime ("regístrese...")
            navigate('/register');
            console.log(code);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold underline bg-green-600">Login</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingrese e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Ingrese password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login | </button>

                {/* ¿No tienes cuenta? Regístrate - Mirar su correcto funcionamiento */}
                {/* <button type="submit">Regístrate...</button> */}
            </form>
        </>
    );
};

export default Login;
