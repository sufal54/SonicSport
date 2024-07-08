const initialState = {
    userData: null,
    allUsers: null,
    allSongs: null,
    topSongs: null,
    allArtist: null,
    allAlbum: null,
    artistCard: false,
    selectArtistData: null,
    filterArtist: null,
    filterAlbum: null,
    filterLanguage: null,
    filterCategory: null,
    isSongPlaying: false,
    songIndex: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                userData: action.payload
            };
        case "SET_ALLUSERS":
            return {
                ...state,
                allUsers: action.payload
            };
        case "SET_ALLSONGS":
            return {
                ...state,
                allSongs: action.payload
            };
        case "SET_TOPSONGS":
            return {
                ...state,
                topSongs: action.payload
            };
        case "SET_ALLARTISTS":
            return {
                ...state,
                allArtist: action.payload
            };
        case "SET_ALLALBUMS":
            return {
                ...state,
                allAlbum: action.payload
            };
        case "SET_ARTISTCARD":
            return {
                ...state,
                artistCard: action.payload
            };
        case "SET_ARTISTDATA":
            return {
                ...state,
                selectArtistData: action.payload
            };
        case "SET_FILTERALBUM":
            return {
                ...state,
                filterAlbum: action.payload
            };
        case "SET_FILTERARTIST":
            return {
                ...state,
                filterArtist: action.payload
            };
        case "SET_FILTERLANGUAGE":
            return {
                ...state,
                filterLanguage: action.payload
            };
        case "SET_FILTERCATEGORY":
            return {
                ...state,
                filterCategory: action.payload
            };
        case "SET_SONGPLAYING":
            return {
                ...state,
                isSongPlaying: action.payload
            };
        case "SET_SONGINDEX":
            return {
                ...state,
                songIndex: action.payload
            };
        default:
            return state;
    }
};

export default reducer;