import { useState } from 'react';

const FilterForm = ({ onSubmit }) => {
    const [songData, setSongData] = useState({
        group: '',
        song: '',
        text: '',
        releaseDate: '',
        link: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSongData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(songData); // Trigger parent function with the form data
    };

    // Clear form inputs and reset the address bar, then refresh the page
    const handleClear = () => {
        const emptyData = {
            group: '',
            song: '',
            text: '',
            releaseDate: '',
            link: ''
        };

        // Reset form data
        setSongData(emptyData);

        // Clear query parameters from the address bar
        window.history.pushState({}, '', window.location.pathname);

        // Trigger onSubmit with empty data to update the page
        onSubmit(emptyData);
    };

    return (
        <div className="bg-neutral-800 p-3 rounded-xl">
            <p className="text-neutral-400">Фильтр</p>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[200px]">
                <label htmlFor="group" className="filter-label">Исполнитель</label>
                <input
                    type="text"
                    name="group"
                    id="group"
                    value={songData.group}
                    onChange={handleChange}
                    className="filter-inputs w-full"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <label htmlFor="song" className="filter-label">Песня</label>
                <input
                    type="text"
                    name="song"
                    id="song"
                    value={songData.song}
                    onChange={handleChange}
                    className="filter-inputs w-full"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <label htmlFor="text" className="filter-label">Текст песни</label>
                <input
                    name="text"
                    id="text"
                    value={songData.text}
                    onChange={handleChange}
                    className="filter-inputs w-full"
                />
            </div>
            <div className="flex-1 min-w-[200px]">
                <label htmlFor="releaseDate" className="filter-label">Дата выпуска</label>
                <input
                    type="date"
                    name="releaseDate"
                    id="releaseDate"
                    value={songData.releaseDate}
                    onChange={handleChange}
                    className="filter-inputs w-full"
                />
            </div>
            <div className="flex space-x-2">
                <button
                    type="submit"
                    className="bg-green-900 text-white p-2 rounded"
                >
                    Фильтровать
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="bg-gray-800 text-white p-2 rounded"
                >
                    Очистить
                </button>
            </div>
        </form>
        </div>
    );
};

export default FilterForm;
