import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserProvider';
// uuid4 y axios en useContext???? Pueden ser globales...
import uuid4 from 'uuid4';
import axios from 'axios';

import { firebaseErrors } from '../utils/firebaseErrors';
import { formValidate } from '../utils/formValidate';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import FormLabel from '../components/FormLabel';

const Register = () => {
    // TODO -> Enviar la obtención de datos API al 'context' ¿?
    const API_URL = 'https://w33.bcn.cat/geoBCN/serveis/territori/districtes/';
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

    //* useStates
    const [district, setDistrict] = useState('');
    const [optionList, setOptionList] = useState([]);

    // Enviar datos del formulario
    const onSubmit = async (data) => {
        const { email, password, district } = data;
        // Ver si necesitamos esta información más adelante (parte FRONTEND)
        //TODO -> para registrar y relacionar districto con el usuario, lo que podemos hacer es un array de objetos donde se registrará por la parte del Frontend todos los usuarios con su respectivo distrito
        //
        setDistrict(district);

        try {
            // Validación BACKEND
            await registerUser(email, password);
            navigate('/home');
        } catch ({ code }) {
            console.log('code...añadir a firebaseErrors los que vayan saliendo...', code);
            setError('firebase', {
                message: firebaseErrors(code)
            });
        }
    };

    useEffect(() => {
        axios.get(API_URL).then(({ data }) => {
            const districtList = data.resultats.map((item) => item.descripcio);
            setOptionList(districtList);
        });
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold underline bg-slate-500">Register</h1>
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
                        type="password"
                        placeholder="Repita password"
                        className="input input-bordered w-full max-w-xs mt-2"
                        {...register('repassword', {
                            validate: validateEquals(getValues)
                        })}
                    ></FormInput>
                    <FormError error={errors.repassword} />
                    <FormLabel className="label" classnamespan="label-text" message="Distrito" />
                    {/* TODO -> Hacer el FormSelect... (https://react-hook-form.com/api/useform/register) */}
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
                    <FormError error={errors.district} />
                    <FormInput className="btn btn-outline mt-5" type="submit">
                        Registrar
                    </FormInput>
                </div>
            </form>
        </>
    );
};

export default Register;
