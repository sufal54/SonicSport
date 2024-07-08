import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

export const vaildateUser = async (token) => {
    try {
        let res = await axios.get(`${baseUrl}api/users/login`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllUsers = async () => {
    try {
        let res = await axios.get(`${baseUrl}api/users/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllSongs = async () => {
    try {
        let res = await axios.get(`${baseUrl}api/song/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllArtists = async () => {
    try {
        let res = await axios.get(`${baseUrl}api/artist/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllAlbums = async () => {
    try {
        let res = await axios.get(`${baseUrl}api/album/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const updateUserRole = async (userId, role) => {
    let newRole = (role === "admin") ? "member" : "admin";
    let chageRole = {
        role: newRole
    }
    try {
        let res = await axios.put(`${baseUrl}api/users/update/${userId}`, chageRole);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const removeUser = async (id) => {
    try {
        let res = await axios.delete(`${baseUrl}api/users/delete/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const saveNewSong = async (data) => {
    try {
        let res = await axios.post(`${baseUrl}api/song/save`, { ...data });
        return (await res).data.saveSong;
    } catch (error) {
        return null;
    }
};

export const removeSong = async (id) => {
    try {
        let res = await axios.delete(`${baseUrl}api/song/delete/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const saveNewArtist = async (data) => {
    try {
        let res = await axios.post(`${baseUrl}api/artist/save`, { ...data });
        return res;
    } catch (error) {
        return null;
    }
};

export const removeArtist = async (id) => {
    try {
        let res = await axios.delete(`${baseUrl}api/artist/delete/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};