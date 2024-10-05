import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getSongInfo} from "../service/service.jsx";

const Lyrics = () => {
    const [songData, setSongData] = useState([]); // State to store song data as an array
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total pages state
    const navigate = useNavigate();

    // Custom hook to parse query parameters
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const group = query.get('group'); // Get group from query parameter
    const song = query.get('song'); // Get song from query parameter

    // Fetch lyrics data based on the current page
    useEffect(() => {
        if (group && song) {
            getSongInfo(group, song, currentPage)
                .then(res => {
                    setSongData(res.data.items);
                    setTotalPages(res.data.page_count); // Update total pages
                    setLoading(false);
                }).catch(err => {
                console.log(err);
                setLoading(false);
            });
        }
    }, [group, song, currentPage]); // Include currentPage as a dependency

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full px-4 mt-5">
            <button onClick={() => navigate(-1)} className="w-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="currentColor" className="mr-2">
                    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                </svg>
                <span className="">Назад</span> {/* Optional text for back link */}
            </button>

            <h2 className="w-full text-center my-2">
                <span className="text-neutral-400 text-xs">Текст песни</span> "{song}" {group}
            </h2>

            <p className="text-neutral-400 text-xs w-full text-center">Дата выпуска: {songData.release_date}</p>

            <pre className="bg-neutral-800 p-3 my-4 rounded-xl w-full">{songData.text.replace(/\\n/g, '<br />')}</pre>



            {/* Pagination Controls */
            }
            <div className="flex justify-center items-center space-x-4">
                <button className="page-button" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                    </svg>
                </button>
                <span> {currentPage} / {totalPages} </span>
                <button className="page-button" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Lyrics;
