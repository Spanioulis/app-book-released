import { forwardRef } from 'react';

const FormButton = forwardRef(({ className, text, type }, ref) => {
    return (
        <button className={className} type={type} ref={ref}>
            {text}
        </button>
    );
});

export default FormButton;
