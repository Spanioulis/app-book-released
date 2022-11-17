import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
import '../styles/loading.css';
// uuid4 y axios en useContext???? Pueden ser globales...
// import uuid4 from 'uuid4';
// import axios from 'axios';

import { firebaseErrors } from '../utils/firebaseErrors';
import { formValidate } from '../utils/formValidate';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
// import FormLabel from '../components/FormButton';
import FormButton from '../components/FormButton';
import FormSelect from '../components/FormSelect';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [registerList, setRegisterList] = useState(
        JSON.parse(localStorage.getItem('Register')) || []
    );

    const { registerUser } = useContext(UserContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors }
    } = useForm();
    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();

    const onSubmit = async (data) => {
        const { email, password, district } = data;

        // Ver si necesitamos esta información más adelante (parte FRONTEND)
        //TODO -> para registrar y relacionar districto con el usuario, lo que podemos hacer es un array de objetos donde se registrará por la parte del Frontend todos los usuarios con su respectivo distrito
        setRegisterList([{ email, password, district }, ...registerList]);

        try {
            setLoading(true);
            await registerUser(email, password);
            console.log('entra aquí?');

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

    useEffect(() => {
        localStorage.setItem('Register', JSON.stringify(registerList));
    }, [registerList]);

    // useEffect(() => {
    //     localStorage.setItem(
    //         'user register',
    //         JSON.stringify(...userRegister, { email, password, district })
    //     );
    //     setUserRegister([...userRegister, { email, password, district }]);
    // }, [])

    return loading ? (
        <div class="spinner"></div>
    ) : (
        <>
            <h1 className="text-2xl mx-auto my-5 text-center font-bold">Register</h1>
            <div className="mx-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
                    <div className="form-control w-full max-w-xs">
                        <FormInput
                            type="email"
                            label="Email"
                            placeholder="Ingrese e-mail"
                            error={errors.email}
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
                        <FormInput
                            type="password"
                            label="Repita password"
                            placeholder="Repita password"
                            error={errors.repassword}
                            {...register('repassword', {
                                validate: validateEquals(getValues('password'))
                            })}
                        />
                        <FormError error={errors.repassword} />
                        <FormSelect
                            {...register('district', {
                                required: {
                                    value: true,
                                    message: 'Campo obligatorio'
                                }
                            })}
                        />

                        <FormError error={errors.district} />
                        <FormButton
                            text="Registrar"
                            type="submit"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-5 w-min"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
