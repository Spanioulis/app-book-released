import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
import '../styles/loading.css';

import { firebaseErrors } from '../utils/firebaseErrors';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
// import FormLabel from '../components/FormButton';
import FormButton from '../components/FormButton';
import FormSelect from '../components/FormSelect';
import { addDoc, collection } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';

const Register = () => {
    const [loading, setLoading] = useState(false);
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

    // Quitar cuando no nos sirva
    // const [registerList, setRegisterList] = useState(
    //     JSON.parse(localStorage.getItem('Register')) || []
    // );

    const onSubmit = async (data) => {
        const { email, password, district } = data;
        const usersCollectionRef = collection(db, 'users');

        console.log({ email, password, district });
        //TODO -> Hay que añadir el auth.currentUser.uid para relacionarlo ;)
        // await addDoc(usersCollectionRef, {});
        //* {email: 'a@a.com', password: '123456', district: 'Sant Andreu'}

        // Ver si necesitamos esta información más adelante (parte FRONTEND)
        // Para registrar y relacionar districto con el usuario, lo que podemos hacer es un array de objetos donde se registrará por la parte del Frontend todos los usuarios con su respectivo distrito
        //! Quitarlo cuando no nos sirva (contacto con backend)
        // setRegisterList([{ email, password, district }, ...registerList]);

        try {
            setLoading(true);
            await registerUser(email, password);
            // await db.collection('users').doc().set({ email, password, district });
            await addDoc(usersCollectionRef, {
                email,
                district,
                uid: auth.currentUser.uid
            });
            console.log('...registro COMPLETADO!');
            console.log(auth.currentUser.uid);
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

    //! ¿NECESARIO? Ya tenemos contacto con el backend
    // useEffect(() => {
    //     localStorage.setItem('Register', JSON.stringify(registerList));
    // }, [registerList]);

    return (
        <>
            <h1 className="text-2xl mx-auto my-5 text-center font-bold">Register</h1>
            <div className="mx-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-zinc-800 dark:border-zinc-800">
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
                        {loading ? (
                            <button className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 w-min loading mr-5 my-5" />
                        ) : (
                            <FormButton
                                text="Registrar"
                                type="submit"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-5 w-min"
                            />
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
