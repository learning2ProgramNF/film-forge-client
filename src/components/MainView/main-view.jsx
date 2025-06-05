// Importing the React library, which is necessary to use JSX and React features
import React from "react";

// Importing the useState hook from React to manage component state
import { useEffect, useState } from "react";

// Importing the MovieCard component to display individual movie previews
import { MovieCard } from "../MovieCard/movie-card";

// Importing the MovieView component to display detailed information about a selected movie
import { MovieView } from "../MovieView/movie-view";

// Importing the LoginView component to display the login screen
import { LoginView } from "../LoginView/login-view"

// Importing a SignUp View component to add a Sign Up Page
import { SignUpView } from "../SignUpView/signup-view" 

// Importing Prop-Types
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Defining and exporting the MainView component
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  // Declaring the movies state, an array of movie objects with info like title, image, director, etc.
  const [movies, setMovies] = useState([]);
  // Declaring state to track which movie is currently selected (starts as null)
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignUpView />
      </>
    );
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://film-forge-11a9389fe47d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            director: doc.director_name?.[0],
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);


  // If no movie is selected, show a list of MovieCard components (one per movie)
  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <>
          <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignUpView />
          </Col>
        </>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The List is Empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-5' key={movie.id} md={3}>
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

export default MainView;
