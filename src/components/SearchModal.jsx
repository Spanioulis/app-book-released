import { useEffect, useState } from 'react';

// const Modal = ({ title, author, district, date, pages, image }) => {
const Modal = ({ info }) => {
    console.log('modalBook', info);

    return (
        <>
            <p>{}</p>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative max-w-none w-full">
                    {/* <label
                        htmlFor="my-modal-3"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label> */}
                    <h3 className="text-lg font-bold">{info.title}</h3>
                </div>
            </div>
        </>
    );
};

export default Modal;
