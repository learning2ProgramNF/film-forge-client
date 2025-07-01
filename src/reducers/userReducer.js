const initialState = {
  user: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "LOGOUT":
      return { user: null, token: null };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "ADD_FAVORITE":
      return {
        ...state,
        user: {
          ...state.user,
          favoriteMovies: [...state.user.favoriteMovies, action.payload],
        },
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        user: {
          ...state.user,
          favoriteMovies: state.user.favoriteMovies.filter(
            (id) => id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
