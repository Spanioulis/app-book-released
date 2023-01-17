import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { firebaseErrors, formValidate } from '../utils';
import { FormButton, FormError, FormInput } from '../components';

import '../styles/loading.css';

export const Login = () => {
   const { loginUser } = useContext(UserContext);

   const [loading, setLoading] = useState(false);

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
         navigate('/home');
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

   return loading ? (
      <div className="spinner"></div>
   ) : (
      <>
         <h1 className="text-2xl mx-auto my-5 text-center font-bold dark:text-gray-300">Login</h1>
         <div className="mx-5 md:mx-auto card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 dark:border-gray-800 dark:bg-metal">
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
                     // TODO -> button "ver contraseña"
                     {...register('password', {
                        minLength,
                        validate: validateTrim
                     })}
                  />
                  <FormError error={errors.password} />
                  <FormButton
                     className="text-white mx-3 md:mx-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-md shadow-green-500/50 dark:shadow-md dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-5 w-min"
                     text="Login"
                     type="submit"
                  />
               </div>
            </form>
         </div>
      </>
   );
};
