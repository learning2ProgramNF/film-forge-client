import React from "react";
import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "The Matrix",
      image: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
      director: "The Wachowskis",
    },
    {
      id: 3,
      title: "Interstellar",
      image: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
      director: "Christopher Nolan",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      image: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
      director: "Quentin Tarantino",
    },
    {
      id: 5,
      title: "The Shawshank Redemption",
      image: "https://m.media-amazon.com/images/I/51NiGlapXlL.jpg",
      director: "Frank Darabont",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
