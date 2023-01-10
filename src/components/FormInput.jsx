import { forwardRef } from 'react';

const FormInput = forwardRef(({ label, type, placeholder, onChange, onBlur, name, error }, ref) => {
   const errorInput = error
      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-600 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
      : 'input input-bordered w-full max-w-xs dark:bg-gray-600';

   return (
      <>
         <label className="label mt-2">
            <span className="label-text dark:text-white" ref={ref}>
               {label}
            </span>
         </label>
         <input
            className="input input-bordered dark:font-light w-full h-10 max-w-xs bg-gray-100 text-metal dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            type={type}
         />
      </>
   );
});

export default FormInput;
