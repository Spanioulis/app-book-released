import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid4 from 'uuid4';
import { UserContext } from '../context/UserProvider';

const Register = () => {
    // TODO -> Enviar la obtención de datos API al 'context'
    const API_URL = 'https://w33.bcn.cat/geoBCN/serveis/territori/districtes/';
    // const API_URL = 'https://w33.bcn.cat/geoBCN/serveis/territori/';
    const { registerUser } = useContext(UserContext);

    const [optionList, setOptionList] = useState([]);
    const [district, setDistrict] = useState('');
    const [email, setEmail] = useState('pani@pani.com');
    const [password, setPassword] = useState('123456');

    const navigate = useNavigate();

    // console.log(registerUser);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('probando submit', email, password, district);
        setDistrict('');

        try {
            await registerUser(email, password, district);
            navigate('/home');
            console.log('usuario creado...');
        } catch ({ code }) {
            console.log(code);
        }
    };

    const handleOption = (e) => {
        setDistrict(e.target.value);
    };

    useEffect(() => {
        //TODO: Cambiar a 'axios'
        fetch(API_URL)
            .then((res) => res.json())
            .then(({ resultats }) => {
                const description = resultats.map((item) => item.descripcio);
                setOptionList(description);
            });
    }, [API_URL]);

    return (
        <>
            <h1 className="primary">Register</h1>
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
                <select
                    className="select select-bordered w-full max-w-xs"
                    // defaultValue={''}
                    value={district}
                    onChange={handleOption}
                    name="option"
                >
                    <option defaultChecked>Selecciona distrito...</option>
                    {optionList.map((item) => {
                        return (
                            <option key={uuid4()} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;
