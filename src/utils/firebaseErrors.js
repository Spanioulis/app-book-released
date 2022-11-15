export const firebaseErrors = (code) => {
    // TODO -> Añadir todos los que vayan surgiendo...
    switch (code) {
        case 'auth/email-already-in-use':
            return {
                code: 'email',
                message: 'Usuario ya registrado'
            };
        case 'auth/invalid-email':
            return {
                code: 'email',
                message: 'Formato email no válido'
            };

        case 'auth/user-not-found':
            return {
                code: 'email',
                message: 'Usuario no registrado (añadir emoticono)'
            };
        case 'auth/wrong-password':
            return {
                code: 'password',
                message: 'Password incorrecto'
            };
        default:
            return 'ERROR en el "server" -> Añadir error a "firebaseErrors"';
    }
};
