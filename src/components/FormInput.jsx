import { forwardRef } from 'react';

const FormInput = forwardRef(({ className, type, placeholder, onChange, onBlur, name }, ref) => {
    return (
        <input
            className={className}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            type={type}
        />
    );
});

export default FormInput;
