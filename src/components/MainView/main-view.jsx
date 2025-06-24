import React from "react";
import { useEffect, useState } from "react";
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
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const patchedUser = storedUser
    ? { ...storedUser, favoriteMovies: storedUser.favoriteMovies || [] }
    : null;
  const [user, setUser] = useState(patchedUser);

  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

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
          title: doc.title || "No Title",
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
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
      });
  }, [token]);

  //Logout Handler
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMovies([]);
  };

  //Update handler for profile
  const handleUpdateUser = async (updatedData) => {
    const response = await fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Update Failed:", errText);
      throw new Error("Failed to update user");
    }

    const resData = await response.json();

    if (resData && resData.token) {
      setUser(resData.user);
      setToken(resData.token);
      localStorage.setItem("user", JSON.stringify(resData.user));
      localStorage.setItem("token", resData.token);
    } else {
      throw new Error("Unexpected response structure from upadte.");
    }
  };

  //Update handler for profile
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

  const addFavorite = (movieId) => {
    fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        const updatedUser = {
          ...user,
          favoriteMovies: [...user.favoriteMovies, movieId],
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.error(err));
  };

  const removeFavorite = (movieId) => {
    fetch(
      `https://film-forge-11a9389fe47d.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        const updatedUser = {
          ...user,
          favoriteMovies: user.favoriteMovies.filter(
            (id) => id.toString() !== movieId
          ),
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((err) => console.error(err));
  };
  // If no movie is selected, show a list of MovieCard components (one per movie)
  return (
    <>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Container>
        <Row className='justify-content-md-center'>
          <Routes>
            <Route
              path='/signup'
              element={user ? <Navigate to='/' /> : <SignUpView />}
            />
            <Route
              path='/login'
              element={
                user ? (
                  <Navigate to='/' />
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

                      setUser(completeUser);
                      setToken(token);
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
              path='/movies/:movieId'
              element={
                !user ? (
                  <Navigate to='/login' />
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      onAddFav={addFavorite}
                      onRemoveFav={removeFavorite}
                    />
                  </Col>
                )
              }
            />
            <Route
              path='/profile'
              element={
                !user ? (
                  <Navigate to='/login' />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      movies={movies}
                      onLogout={handleLogout}
                      onLoggedOut={handleLogout}
                      onUpdateUser={handleUpdateUser}
                      onDeleteUser={handleDeleteUser}
                      onAddFav={addFavorite}
                      onRemoveFav={removeFavorite}
                    />
                  </Col>
                )
              }
            />
            <Route
              path='/'
              element={
                !user ? (
                  <Navigate to='/login' />
                ) : movies.length === 0 ? (
                  <div>The List is Empty!</div>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className='mb-5' key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          isFavorite={(user.favoriteMovies || []).includes(
                            movie._id
                          )}
                          onFavoriteToggle={() =>
                            (user.favoriteMovies || []).includes(movie._id)
                              ? removeFavorite(movie._id)
                              : addFavorite(movie._id)
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
  );
};

export default MainView;
