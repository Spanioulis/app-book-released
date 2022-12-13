import React from 'react';

const Cards = ({ key, image, title, author, district, handleUpdate }) => {
    return (
        <>
            <div
                // className="card card-home card-side w-72 h-52 rounded-xl shadow-[0_35px_60px_-10px_rgba(0,0,0,0.4)] bg-gray-200 dark:bg-stone-800 hover:scale-105"
                className="card card-home card-side w-72 h-52 bg-gray-200 dark:bg-stone-800 hover:scale-105"
                key={key}
            >
                <figure className="ml-4 w-1/3">
                    <img src={image} alt={title} className="rounded-md w-full" />
                </figure>
                <div className="card-body w-2/3 px-5 overflow-hidden align-baseline">
                    <div>
                        <h6 className="card-title text-base overflow-hidden">{title}</h6>
                        <p className="text-sm ">{author}</p>
                        <p className="text-sm">Distrito: {district}</p>
                    </div>
                    <label
                        htmlFor="my-modal-6"
                        className="btn btn-outline btn-sm text-sm rounded-3xl hover:bg-tahiti hover:border-none text-tahiti dark:hover:text-gray-200"
                        onClick={handleUpdate}
                    >
                        Reservar
                    </label>
                </div>
            </div>
        </>
    );
};

export default Cards;
