import { forwardRef } from 'react';

export const FormButton = forwardRef(({ className, text, type }, ref) => {
   return (
      <button className={className} type={type} ref={ref}>
         {text}
      </button>
   );
});
