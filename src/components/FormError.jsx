const FormError = ({ error }) => {
    return (
        <>
            {error && (
                <p class="mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-medium">
                    * {error.message}
                </p>
            )}
        </>
    );
};

export default FormError;
