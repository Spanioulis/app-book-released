const Modal = ({ index, title, author, district, date, pages, image }) => {
    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative max-w-max">
                    <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <img
                        alt={title}
                        className="min-w-48 h-64 block mx-auto rounded-l-lg"
                        src={image}
                    />
                    <p className="py-4">
                        You've been selected for a chance to get one year of subscription to use
                        Wikipedia for free!
                    </p>
                </div>
            </div>
        </>
    );
};

export default Modal;
