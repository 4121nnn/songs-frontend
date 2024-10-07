import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSong, getSongById, updateSongById } from "../service/service.jsx";

const SongForm = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const navigate = useNavigate(); // For navigation after save
    const [formData, setFormData] = useState({
        group: '',
        song: '',
        text: '',
        release_date: '',
        link: '',
    });

    useEffect(() => {
        if (id) {
            getSongById(id).then((res) => {
                const song = res.data;
                setFormData({
                    group: song.group,
                    song: song.song,
                    text: song.text,
                    release_date: song.release_date,
                    link: song.link,
                });
            }).catch(err => console.log(err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            updateSongById(id, formData)
                .then(res => { console.log(res); })
                .catch(err => console.log(err));
        } else {
            createSong(formData)
                .then(res => { console.log(res) })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="song-form mt-2 flex justify-center">
            <div className="w-full max-w-md"> {/* Container for controlling form width */}
                <h2 className="text-center m-2">{id ? 'Редактировать песню' : 'Добавить новую песню'}</h2>
                <form onSubmit={handleSubmit} className="bg-neutral-800 p-6 rounded-xl">
                    <div className="mb-4"> {/* Added margin bottom for spacing */}
                        <label className="filter-label block text-left mb-1" htmlFor="group">
                            Исполнитель:
                        </label>
                        <input
                            className="input w-full"
                            type="text"
                            id="group"
                            name="group"
                            value={formData.group}
                            onChange={handleChange}
                            required
                            placeholder="Исполнитель"
                        />
                    </div>
                    <div className="mb-4"> {/* Added margin bottom for spacing */}
                        <label className="filter-label block text-left mb-1" htmlFor="song">
                            Песня:
                        </label>
                        <input
                            className="input w-full" // Ensure input takes full width
                            type="text"
                            id="song"
                            name="song"
                            value={formData.song}
                            onChange={handleChange}
                            required
                            placeholder="Песня"
                        />
                    </div>
                    <div className="mb-4"> {/* Added margin bottom for spacing */}
                        <label className="filter-label block text-left mb-1" htmlFor="text">
                            Текст песни:
                        </label>
                        <textarea
                            className="input w-full h-40" // Ensure textarea takes full width
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            required
                            placeholder="Текст песни"
                        />
                    </div>
                    <div className="mb-4"> {/* Added margin bottom for spacing */}
                        <label className="filter-label block text-left mb-1" htmlFor="releaseDate">
                            Дата выпуска:
                        </label>
                        <input
                            className="input w-full" // Ensure input takes full width
                            type="text"
                            id="release_date"
                            name="release_date"
                            value={formData.release_date}
                            onChange={handleChange}
                            required
                            placeholder="16.02.2010"
                        />
                    </div>
                    <div className="mb-4 gap-1"> {/* Added margin bottom for spacing */}
                        <label className="filter-label block text-left mb-1" htmlFor="link">
                            Cсылка:
                        </label>
                        <input
                            className="input w-full" // Ensure input takes full width
                            type="text"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                            placeholder="Cсылка"
                        />
                    </div>
                    <div className=" flex justify-between mt-4">
                        <button className="bg-blue-900 p-3 rounded-xl hover:bg-blue-800" type="submit">{id ? 'Обновить' : 'Добавить'}</button>
                        <button className="bg-red-900 p-3 rounded-xl hover:bg-blue-800" type="button" onClick={() => navigate(-1)}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SongForm;
