export const formValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: 'Campo obligatorio'
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: 'Formato de email incorrecto'
        },
        minLength: { value: 6, message: 'Mínimo 6 carácteres' },
        // TODO: Mejor opción es pattern con expresiones regulares (cuando no sea prueba)
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) return 'Escriba una contraseña, por favor!';
                true;
            }
        },
        validateEquals(getValues) {
            return {
                equals: (v) => v === getValues('password') || 'No coinciden las contraseñas'
            };
        }
    };
};
