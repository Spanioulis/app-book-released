import { forwardRef } from 'react';

const FormInput = forwardRef(({ label, type, placeholder, onChange, onBlur, name, error }, ref) => {
    const errorInput = error
        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
        : 'input input-bordered w-full max-w-xs';

    return (
        <>
            <label className="label mt-2">
                <span className="label-text" ref={ref}>
                    {label}
                </span>
            </label>
            <input
                className={errorInput}
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
