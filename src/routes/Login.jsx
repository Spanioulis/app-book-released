import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

import { formValidate } from '../utils/formValidate';
import { firebaseErrors } from '../utils/firebaseErrors';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import FormLabel from '../components/FormLabel';

const Login = () => {
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
            await loginUser(email, password);
            navigate('/home');
        } catch ({ code }) {
            console.log('code...añadir a firebaseErrors los que vayan saliendo...', code);
            setError('firebase', {
                message: firebaseErrors(code)
            });
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold underline bg-green-600">Login</h1>
            <hr />
            <FormError error={errors.firebase} />

            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
                <div className="form-control w-full max-w-xs">
                    <FormLabel className="label" classnamespan="label-text" message="Email" />
                    <FormInput
                        type="email"
                        placeholder="Ingrese e-mail"
                        className="input input-bordered w-full max-w-xs"
                        {...register('email', {
                            required,
                            pattern: patternEmail
                        })}
                    ></FormInput>
                    <FormError error={errors.email} />
                    <FormLabel className="label" classnamespan="label-text" message="Password" />
                    <FormInput
                        type="password"
                        placeholder="Ingrese password"
                        className="input input-bordered w-full max-w-xs"
                        // button "ver contraseña"
                        {...register('password', {
                            minLength,
                            validate: validateTrim
                        })}
                    ></FormInput>
                    <FormError error={errors.password} />
                    <FormInput
                        className="btn btn-sm btn-active btn-ghost min-w-fit mt-5"
                        type="submit"
                    >
                        Login
                    </FormInput>
                    {/* ¿No tienes cuenta? Regístrate - Mirar su correcto funcionamiento */}
                    {/* <button type="submit">Regístrate...</button> */}
                </div>
            </form>
        </>
    );
};

export default Login;
