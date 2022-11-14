export const firebaseErrors = (code) => {
    // TODO -> Añadir todos los que vayan surgiendo...
    switch (code) {
        case 'auth/email-already-in-use':
            return 'Usuario ya registrado';
        case 'auth/invalid-email':
            return 'Formato email no válido';
        case 'auth/user-not-found':
            return 'Usuario no registrado (añadir emoticono)';
        case 'auth/wrong-password':
            return 'Password incorrecto';
        default:
            return 'ERROR en el "server" -> Añadir error a "firebaseErrors"';
    }
};
