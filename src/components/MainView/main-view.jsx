// Importing the React library, which is necessary to use JSX and React features
import React from "react";

// Importing the useState hook from React to manage component state
import { useEffect, useState } from "react";

// Importing the MovieCard component to display individual movie previews
import { MovieCard } from "../MovieCard/movie-card";

// Importing the MovieView component to display detailed information about a selected movie
import { MovieView } from "../MovieView/movie-view";

// Importing Prop-Types
import PropTypes from "prop-types";

// Defining and exporting the MainView component
const MainView = () => {
  // Declaring the movies state, an array of movie objects with info like title, image, director, etc.
  const [movies, setMovies] = useState([]);
  // Declaring state to track which movie is currently selected (starts as null)
  const [selectedMovie, setSelectedMovie] = useState(null);

  // If a movie has been selected, render the MovieView component with its details
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  useEffect(() => {
    fetch("https://film-forge-11a9389fe47d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies", error);
      });
  }, []);

  // If there are no movies in the list, show a fallback message
  if (movies.length === 0) {
    return <div>The List is Empty!</div>;
  }

  // If no movie is selected, show a list of MovieCard components (one per movie)
  return (
    <div>
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
