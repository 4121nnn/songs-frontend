import { useEffect, useState } from 'react';
import { deleteSong, getSongs } from "../service/service.jsx";

const PaginatedSongs = ({ filterData }) => {
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchSongs = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await getSongs(page, perPage, filterData);
            setSongs(response.data.items);
            setTotalCount(response.data.total_count);
        } catch (err) {
            setError('Error fetching songs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [page, filterData]);

    const handleNextPage = () => {
        if (page * perPage < totalCount) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    // Update song list after deletion
    const handleDelete = async (id) => {
        try {
            await deleteSong(id);
            fetchSongs(); // Refresh song list after deletion
        } catch (err) {
            console.error("Error deleting song", err);
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className=''>
                {songs.map((song, index) => (
                    <li key={index}
                        className="px-5 py-2 bg-neutral-800 my-2 rounded-xl flex justify-between items-center">
                        <div>
                            <a
                                href={`/info?group=${encodeURIComponent(song.group)}&song=${encodeURIComponent(song.song)}`}
                                className="hover:text-blue-800"
                            >
                                {song.group} - {song.song}
                            </a>
                            <p className="text-xs text-neutral-500">{song.release_date}</p>
                        </div>

                        <div className="flex space-x-2">
                            <a href={`/edit/${encodeURIComponent(song.id)}`} className="mx-2 text-neutral-400 hover:text-neutral-500">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px"
                                     fill="currentColor">
                                    <path
                                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                </svg>
                            </a>
                            <button className="mx-2 text-neutral-400 hover:text-neutral-500" onClick={() => handleDelete(song.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px"
                                     fill="currentColor">
                                    <path
                                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                </svg>
                            </button>
                        </div>
                    </li>

                ))}
            </ul>
            <div className="flex justify-center items-center space-x-4">
                <button className="page-button" onClick={handlePrevPage} disabled={page === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                    </svg>
                </button>
                <span> {page} / {totalCount} </span>
                <button className="page-button" onClick={handleNextPage} disabled={page * perPage >= totalCount}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PaginatedSongs;
