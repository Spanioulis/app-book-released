import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import '../styles/loading.css';

import { formValidate } from '../utils/formValidate';
import { firebaseErrors } from '../utils/firebaseErrors';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const Login = () => {
   const [loading, setLoading] = useState(false);
   const { loginUser, loginWithGoogle } = useContext(UserContext);
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

   // const handleGoogleLogin = async () => {
   //     await loginWithGoogle();
   // };

   return loading ? (
      <div className="spinner"></div>
   ) : (
      <>
         <h1 className="text-2xl mx-auto my-10 text-center font-bold dark:text-gray-300">Login</h1>
         <div className="mx-auto card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:border-gray-800 dark:bg-metal ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
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
                  <FormButton
                     className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-md shadow-green-500/50 dark:shadow-md dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-5 w-min"
                     text="Login"
                     type="submit"
                  />
                  {/* ¿No tienes cuenta? Regístrate - Mirar su correcto funcionamiento */}
                  {/* <button onClick={login}>Regístrate...</button> */}
               </div>
            </form>
         </div>
      </>
   );
};

export default Login;
