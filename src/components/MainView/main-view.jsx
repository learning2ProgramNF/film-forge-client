import React from "react";
import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image: "https://m.media-amazon.com/images/I/51nbVEuw1HL._AC_SY445_.jpg",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "The Matrix",
      image: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY445_.jpg",
      director: "The Wachowskis",
    },
    {
      id: 3,
      title: "Parasite",
      image: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
      director: "Bong Joon-ho",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      image: "https://m.media-amazon.com/images/I/51k0qa6zY-L._AC_SY445_.jpg",
      director: "Quentin Tarantino",
    },
    {
      id: 5,
      title: "Spirited Away",
      image: "https://m.media-amazon.com/images/I/81Z8Rwi3DyL._AC_SY679_.jpg",
      director: "Hayao Miyazaki",
    },
  ]);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedBook(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The List is Empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedBook(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
