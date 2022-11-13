import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
import uuid4 from 'uuid4';

const Register = () => {
    // TODO -> Enviar la obtención de datos API al 'context'
    const API_URL = 'https://w33.bcn.cat/geoBCN/serveis/territori/districtes/';
    // const API_URL = 'https://w33.bcn.cat/geoBCN/serveis/territori/';
    const { registerUser } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    //* useStates
    const [district, setDistrict] = useState('');
    const [optionList, setOptionList] = useState([]);

    // Enviar datos del formulario
    const onSubmit = async (data) => {
        const { email, password, district } = data;
        // Ver si necesitamos esta información más adelante (parte FRONTEND)
        //TODO -> para registrar y relacionar districto con el usuario, lo que podemos hacer es un array de objetos donde se registrará por la parte del Frontend todos los usuarios con su respectivo distrito
        console.log({ email: email, contraseña: password, distrito: district });
        setDistrict(district);

        try {
            // Validación BACKEND
            await registerUser(email, password);
            navigate('/home');
            console.log('usuario creado...', email, password);
        } catch ({ code }) {
            switch (code) {
                case 'auth/email-already-in-use':
                    setError('email', { message: '¡Usuario ya registrado!' });
                    break;
                case 'auth/invalid-email':
                    setError('email', { message: 'Formato email no válido' });
                    break;
                default:
                    console.log('Error en el "server"');
            }
        }
    };

    // const handleOption = (e) => {
    //     setDistrict(e.target.value);
    // };

    console.log('district', district);

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
            <h1 className="text-3xl font-bold underline bg-slate-500">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Ingrese e-mail"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Campo obligatorio'
                        },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: 'Formato de email incorrecto'
                        }
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <input
                    // button "ver contraseña"
                    type="password"
                    placeholder="Ingrese password"
                    {...register('password', {
                        setValues: (v) => v.trim(),
                        minLength: { value: 6, message: 'Mínimo 6 carácteres' },
                        validate: {
                            trim: (v) => {
                                if (!v.trim()) return 'Escriba una contraseña, por favor!';
                                true;
                            }
                        }
                        // TODO: Mejor opción es pattern con expresiones regulares (cuando no sea prueba)
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <input
                    type="password"
                    placeholder="Repita password"
                    {...register('repassword', {
                        setValues: (v) => v.trim(),
                        validate: {
                            equals: (v) =>
                                v === getValues('password') || 'No coinciden las contraseñas'
                        }
                    })}
                />
                {errors.repassword && <span>{errors.repassword.message}</span>}
                <select
                    className="select select-bordered w-full max-w-xs"
                    {...register('district', {
                        required: {
                            value: true,
                            message: 'Campo obligatorio'
                        }
                    })}
                >
                    <option value="">--Selecciona distrito--</option>
                    {optionList.map((item) => {
                        return (
                            <option key={uuid4()} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                {errors.district && <span>{errors.district.message}</span>}
                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;
