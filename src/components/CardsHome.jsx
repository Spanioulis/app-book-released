import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Cards = ({ image, title, author, district, handleUpdate, index, uidBook, currentUser }) => {
    // const navigate  = Navigate();
    //TODO -> Convertir este handleUpdate en envío de parámetros al chat
    // const handleChat = () => {
    //     console.log(uid);
    //     navigate('/chat');
    // };

    return (
        <div
            // className="card card-home card-side w-72 h-52 rounded-xl shadow-[0_35px_60px_-10px_rgba(0,0,0,0.4)] bg-gray-200 dark:bg-stone-800 hover:scale-105"
            className="card card-home card-side w-72 h-52 bg-silver dark:bg-dark dark:text-gray-300 hover:scale-110"
            key={index}
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
                {/* TODO - Cambiar por el logo del chat */}
                {currentUser !== uidBook && (
                    <Link
                        to="/chat"
                        state={{ uidBook, title }}
                        // onClick={() => handleChat(uid)}
                        className="btn btn-outline btn-sm text-sm rounded-3xl hover:bg-main hover:border-none text-main dark:hover:text-gray-200"
                    >
                        Chat
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Cards;
