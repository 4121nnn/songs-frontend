//service/service.jsx
import axios from "axios";

const REST_API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;


export const getSongs = (page, perPage, filterData) => axios.get(REST_API_BASE_URL, {
    params: { page, per_page: perPage, ...filterData, },
});

export const getSongById = (id) => axios.get(REST_API_BASE_URL + "/" +id);

export const createSong = (data) => axios.post(REST_API_BASE_URL, data);

export const updateSongById = (id, data) => axios.put(REST_API_BASE_URL + "/" +id, data);

export const deleteSong = (id) => axios.delete(REST_API_BASE_URL + "/" + id);

export const getSongInfo = (group, song, currentPage) => axios.get(`${REST_API_BASE_URL}/info`, {
        params: { group, song, page: currentPage }
    });
export const create = (model) => axios.post(REST_API_BASE_URL, model);
