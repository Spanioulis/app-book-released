import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
import { addDoc, collection } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';
import { firebaseErrors, formValidate } from '../utils';
import { FormButton, FormError, FormInput, FormSelect } from '../components';

import '../styles/loading.css';

export const Register = () => {
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

   const onSubmit = async (data) => {
      const { email, password, district, username } = data;
      const usersCollectionRef = collection(db, 'users');

      try {
         setLoading(true);
         await registerUser(email, password, username);
         await addDoc(usersCollectionRef, {
            email,
            district,
            // TODO -> Añadir "username"
            username,
            uid: auth.currentUser.uid
         });
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

   return (
      <>
         <h1 className="text-2xl mx-auto my-3 sm:my-10 text-center font-bold dark:text-gray-300">Register</h1>
         <div className="mx-5 sm:mx-auto card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 dark:border-gray-800 dark:bg-metal">
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
                     type="text"
                     label="Username"
                     placeholder="Ingrese username"
                     error={errors.username}
                     {...register('username', {
                        required: {
                           value: true,
                           message: 'Campo obligatorio'
                        }
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
                     <button className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 w-min loading mx-3 md:mx-0 my-5" />
                  ) : (
                     <FormButton
                        text="Registrar"
                        type="submit"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-md shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-3 md:mx-0 my-5 w-min"
                     />
                  )}
               </div>
            </form>
         </div>
      </>
   );
};
