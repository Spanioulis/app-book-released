export const firebaseErrors = (code) => {
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
            message: 'Usuario no registrado 😪'
         };
      case 'auth/wrong-password':
         return {
            code: 'password',
            message: 'Password incorrecto'
         };
      case 'auth/too-many-requests':
         return {
            code: 'password',
            message: 'Número de intentos excedido; retee el password'
         };
      default:
         return 'ERROR en el "server" -> Añadir error a "firebaseErrors"';
   }
};
