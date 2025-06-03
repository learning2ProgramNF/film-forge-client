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

// Defining and exporting the MainView component
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
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
        }} />
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
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("Fetched movies", movies);
        setMovies(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies", error);
      });
  }, [token]);

  // If a movie has been selected, render the MovieView component with its details
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        movies={movies}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // If there are no movies in the list, show a fallback message
  if (movies.length === 0) {
    return <div>The List is Empty!</div>;
  }

  // If no movie is selected, show a list of MovieCard components (one per movie)
  return (
    <div>
      <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id} // Unique key to help React track each item
          movie={movie} // Passing movie data as a prop
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie); // Updates the selected movie when a card is clicked
          }}
        />
      ))}
    </div>
  );
};

export default MainView;
