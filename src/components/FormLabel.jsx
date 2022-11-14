import { forwardRef } from 'react';

const FormLabel = forwardRef(({ className, classnamespan, message }, ref) => {
    return (
        <>
            <label className={className}>
                <span className={classnamespan} ref={ref}>
                    {message}
                </span>
            </label>
        </>
    );
});

export default FormLabel;
