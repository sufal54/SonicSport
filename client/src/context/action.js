export const setUserData = (userData) => ({
    type: "SET_USER",
    payload: userData,
});

export const setAllUsers = (userData) => ({
    type: "SET_ALLUSERS",
    payload: userData,
});

export const setAllSongs = (userData) => ({
    type: "SET_ALLSONGS",
    payload: userData,
});

export const setTopSongs = (userData) => ({
    type: "SET_TOPSONGS",
    payload: userData,
});

export const setAllArtists = (userData) => ({
    type: "SET_ALLARTISTS",
    payload: userData,
});

export const setAllAlbums = (userData) => ({
    type: "SET_ALLALBUMS",
    payload: userData,
});

export const setArtistCard = (userData) => ({
    type: "SET_ARTISTCARD",
    payload: userData,
});

export const setArtistData = (userData) => ({
    type: "SET_ARTISTDATA",
    payload: userData,
});

//FILTERS

export const setFilterAlbum = (userData) => ({
    type: "SET_FILTERALBUM",
    payload: userData,
});

export const setFilterArtist = (userData) => ({
    type: "SET_FILTERARTIST",
    payload: userData,
});

export const setFilterLanguage = (userData) => ({
    type: "SET_FILTERLANGUAGE",
    payload: userData,
});

export const setFilterCategory = (userData) => ({
    type: "SET_FILTERCATEGORY",
    payload: userData,
});

export const setSongPlaying = (userData) => ({
    type: "SET_SONGPLAYING",
    payload: userData,
});

export const setSongIndex = (userData) => ({
    type: "SET_SONGINDEX",
    payload: userData,
});