import sort from '../assets/sort.svg';

const Table = ({ handleSort }) => {
    return (
        <thead>
            <tr>
                <th>#</th>
                <th>
                    <div className="flex gap-1">
                        <p className="pt-1">Título</p>
                        <input
                            name="Title"
                            type="image"
                            value="title"
                            src={sort}
                            alt="Sort Icon"
                            onClick={handleSort}
                        />
                    </div>
                </th>
                <th>
                    <div className="flex gap-1">
                        <p className="pt-1">Autor</p>
                        <input
                            name="Author"
                            type="image"
                            value="author"
                            src={sort}
                            alt="Sort Icon"
                            onClick={handleSort}
                        />
                    </div>
                </th>
                <th>
                    <div className="flex gap-1">
                        <p className="pt-1">Páginas</p>
                        <input
                            name="Pages"
                            type="image"
                            value="pages"
                            src={sort}
                            alt="Sort Icon"
                            onClick={handleSort}
                        />
                    </div>
                </th>
                <th>
                    <div className="flex gap-1">
                        <p className="pt-1">Fecha</p>
                        <input
                            name="Date"
                            type="image"
                            value="date"
                            src={sort}
                            alt="Sort Icon"
                            onClick={handleSort}
                        />
                    </div>
                </th>
                <th>
                    <div className="flex gap-1">
                        <p className="pt-1">Distrito</p>
                        <input
                            name="District"
                            type="image"
                            value="district"
                            src={sort}
                            alt="Sort Icon"
                            onClick={handleSort}
                        />
                    </div>
                </th>
                <th>
                    <div className="flex gap-1">
                        <p className="pt-1">Información</p>
                    </div>
                </th>
            </tr>
        </thead>
    );
};

export default Table;
