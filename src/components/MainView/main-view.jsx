import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setToken,
  logoutUser,
  updateUser,
  addFavorite,
  removeFavorite,
} from "../../actions/userActions.js";
import { setMovies } from "../../actions/movieActions";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignUpView } from "../SignUpView/signup-view";
import { ProfileView } from "../ProfileView/profile-view";
import { NavigationBar } from "../NavigationBar/navigation-bar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// Defining and exporting the MainView component
export const MainView = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const movies = useSelector((state) => state.movies);

  //Restore from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch(setUser(storedUser));
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  //Fetch movies when token exists
  useEffect(() => {
    if (!token) return;

    fetch("https://film-forge-11a9389fe47d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch movies");
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((doc) => ({
          _id: doc._id,
          title: doc.title || "No title",
          description: doc.description || "No Description",
          imagePath: doc.imagePath || "https://via.placeholder.com/150",
          genre: {
            name: doc.genre?.name || "Unknown",
            description: doc.genre?.description || "",
          },
          director: {
            name: doc.director?.name || "Unknown",
            bio: doc.director?.bio || "",
          },
        }));
        dispatch(setMovies(moviesFromApi));
      })
      .catch((err) => console.error("Fetch error: ", err));
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setMovies([]));
  };

  const handleUpdateUser = async (updateData) => {
    const response = await fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Update Failed: ", errText);
      throw new Error("Failed to update user");
    }

    const resData = await response.json();
    if (resData?.user && resData?.token) {
      dispatch(setUser(resData.user));
      dispatch(setToken(resData.token));
      localStorage.setItem("user", JSON.stringify(resData.user));
      localStorage.setItem("token", resData.token);
    } else {
      throw new Error("Unexpected response structure from update");
    }
  };

  const handleDeleteUser = () => {
    fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        handleLogout();
        alert("Your account has been deleted.");
      })
      .catch((err) => console.error(err));
  };

  const handleAddFavorite = (movieId) => {
    fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
     .then(() => {
      dispatch(addFavorite(movieId));
      const updatedUser = {
        ...user,
        favoriteMovies: [...user.favoriteMovies, movieId],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
     })
     .catch((err) => console.error(err));
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}/movies/${movieId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
    )
      .then(() => {
        dispatch(removeFavorite(movieId));
        const updatedUser = {
          ...user,
          favoriteMovies: user.favoriteMovies.filter((id) => id !== movieId),
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route 
              path='signup'
              element={user ? <Navigate to="/" /> : <SignUpView />}
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                     const completeUser = {
                      _id: user._id,
                      username: user.username,
                      email: user.email,
                      birthday: user.birthday,
                      favoriteMovies: user.favoriteMovies || [],
                     };
                     dispatch(setUser(completeUser));
                     dispatch(setToken(token));
                     localStorage.setItem(
                      "user",
                      JSON.stringify(completeUser)
                     );
                     localStorage.setItem("token", token);
                    }}
                  />
                )
              }
            />
            <Route
             path="movies/:movieId"
             element={
              !user ? (
                <Navigate to="/login"/>
              ): (
                <Col md={8}>
                  <MovieView
                    movies={movies}
                    user={user}
                    onAddFav={handleAddFavorite}
                    onRemoveFav={handleRemoveFavorite}
                  />
                </Col>
              )
             } 
            />
            <Route
             path="/profile"
            element={
              !user ? (
                <Navigate to="/login"/>
              ) : (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    movies={movies}
                    onLogout={handleLogout}
                    onLoggedOut={handleLogout}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                    onAddFav={handleAddFavorite}
                    onRemoveFav={handleRemoveFavorite}
                  />
                </Col>
              )
            }
            />
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login"/>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          isFavorite={(user.favoriteMovies || []).includes(
                            movie._id
                          )}
                          onFavoriteToggle={() => 
                          (user.favoriteMovies || []).includes(movie._id)
                            ? handleRemoveFavorite(movie._id)
                            : handleAddFavorite(movie._id)
                          }
                        />
                      </Col>
                    ))}
                  </>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </>
  )
};

export default MainView;
