import FilterForm from "./FilterForm.jsx";
import PaginatedSongs from "./PaginatedSongs.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Songs = () => {
    const [filterData, setFilterData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    // Function to parse query parameters from the URL
    const parseQuery = () => {
        const params = new URLSearchParams(location.search);
        const data = {};
        for (const [key, value] of params.entries()) {
            data[key] = value;
        }
        return data;
    };

    // Effect to set filterData from URL on component mount
    useEffect(() => {
        const queryData = parseQuery();
        setFilterData(queryData);
    }, [location.search]); // Re-run when the URL changes

    const handleFilter = (songData) => {
        setFilterData(songData); // Update filter data state

        // Update the URL with the new filter data
        const params = new URLSearchParams(songData).toString();
        navigate(`?${params}`); // Update the address bar
    };

    return (
        <div>
            <a href="/add"
                className="inline-block m-4 p-2 bg-purple-900 rounded-xl hover:bg-purple-700">
                Добавить новую песню
            </a>
            <div className="mx-auto px-4">
                <FilterForm onSubmit={handleFilter} />
                <PaginatedSongs filterData={filterData} /> {/* Pass filterData to PaginatedSongs */}
            </div>
        </div>
    );
};

export default Songs;
