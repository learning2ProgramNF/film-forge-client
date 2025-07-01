export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user
});

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token
});

export const logoutUser = () => ({
  type: 'LOGOUT'
});

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user
});

export const addFavorite = (movieId) => ({
  type: 'ADD_FAVORITE',
  payload: movieId
});

export const removeFavorite = (movieId) => ({
  type: 'REMOVE_FAVORITE',
  payload: movieId
});