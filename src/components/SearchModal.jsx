const Modal = ({
    title,
    author,
    district,
    date,
    pages,
    image,
    category,
    description,
    infoLink
}) => {
    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative max-w-none w-2/3">
                    <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-5 top-5 hover:bg-main hover:border-main"
                    >
                        ✕
                    </label>
                    <div className="flex">
                        <img src={image} alt={title} className="rounded-md" />
                        <div className="flex flex-col justify-center ml-10">
                            <h3 className=" py-2">{title}</h3>
                            <p className=" py-2">{author}</p>
                            <p className=" py-2">Distrito: {district}</p>
                            <p className="py-2">{pages} páginas</p>
                        </div>
                    </div>
                    <p className="  py-2">Fecha de subida: {date}</p>
                    <p className="  py-2">Categoría: {category}</p>
                    <p className=" text-base text-tahiti py-2">{description}</p>
                    <a href={infoLink} target="_blank" rel="noopener noreferrer">
                        Info Link
                    </a>
                </div>
            </div>
        </>
    );
};

export default Modal;
