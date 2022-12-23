import { useState } from 'react';
import info from '../assets/expand-more.svg';
import Modal from './SearchModal';

const CardsSearch = ({ index, title, author, district, date, pages }) => {
    // TODO -> Crear un objeto nuevo para el modal que cambie según la información que le damos?
    // const [first, setfirst] = useState(second);

    //? ¿handleOnSubmit?
    const handleModal = () => {
        console.log(title, pages, author, district);
    };
    return (
        <tbody>
            <tr className={index % 2 !== 0 && 'active'}>
                <th>{index + 1}</th>
                <td>{title}</td>
                <td>{author}</td>
                <td>{pages}</td>
                <td>{date}</td>
                <td>{district}</td>
                <td className="mx-auto my-auto text-tahi">
                    <span onClick={() => handleModal(title, pages)}>
                        <label htmlFor="my-modal-3">
                            <img
                                src={info}
                                alt="info-icon"
                                width="20"
                                htmlFor="my-modal-3"
                                className="cursor-pointer hover:scale-110"
                            />
                        </label>
                    </span>
                    <Modal title={title} />
                </td>
            </tr>
        </tbody>
    );
};

export default CardsSearch;
