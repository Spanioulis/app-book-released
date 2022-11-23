import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import '../styles/loading.css';

import { formValidate } from '../utils/formValidate';
import { firebaseErrors } from '../utils/firebaseErrors';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            setLoading(true);
            await loginUser(email, password);
            navigate('/');
        } catch (error) {
            console.log('code...añadir a firebaseErrors los que vayan saliendo...', error.code);
            const { code, message } = firebaseErrors(error.code);
            setError(code, {
                message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-2xl mx-auto my-10 text-center font-bold">Login</h1>
            <div className="mx-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex justify-center  dark:bg-zinc-800 dark:rounded-lg"
                >
                    <div className="form-control w-full max-w-xs">
                        {' '}
                        <FormInput
                            type="email"
                            label="Email"
                            error={errors.email}
                            placeholder="Ingrese e-mail"
                            {...register('email', {
                                required,
                                pattern: patternEmail
                            })}
                        />
                        <FormError error={errors.email} />
                        <FormInput
                            type="password"
                            label="Password"
                            placeholder="Ingrese password"
                            error={errors.password}
                            // button "ver contraseña"
                            {...register('password', {
                                minLength,
                                validate: validateTrim
                            })}
                        />
                        <FormError error={errors.password} />
                        {loading ? (
                            <div className="container">
                                <button className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mr-5 my-5 w-min loading" />
                                <Link
                                    to="/register"
                                    className="link text-base link-primary dark:link-info"
                                >
                                    ¿No tienes cuenta? Regístrate
                                </Link>
                            </div>
                        ) : (
                            <div className="container">
                                <FormButton
                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-5 my-5 w-min"
                                    text="Login"
                                    type="submit"
                                />
                                <Link
                                    to="/register"
                                    className="link text-base link-primary dark:link-info"
                                >
                                    ¿No tienes cuenta? Regístrate
                                </Link>
                            </div>
                        )}
                        {/* ¿No tienes cuenta? Regístrate - Mirar su correcto funcionamiento */}
                        {/* <button type="submit">Regístrate...</button> */}
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
