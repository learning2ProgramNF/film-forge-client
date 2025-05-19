// Importing the React library, which is necessary to use JSX and React features
import React from "react";

// Importing the useState hook from React to manage component state
import { useState } from "react";

// Importing the MovieCard component to display individual movie previews
import { MovieCard } from "../MovieCard/movie-card";

// Importing the MovieView component to display detailed information about a selected movie
import { MovieView } from "../MovieView/movie-view";

// Defining and exporting the MainView component
const MainView = () => {
  // Declaring the movies state, an array of movie objects with info like title, image, director, etc.
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg",
      director: "Christopher Nolan",
      description:
        "A skilled thief is given a chance at redemption if he can successfully perform inception.",
      genre: "Science Fiction",
      directorBio:
        "Christopher Nolan is known for mind-bending, high-concept films like Inception, Interstellar, and Tenet.",
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      image: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
      director: "Frank Darabont",
      description:
        "Two imprisoned men bond over years and find redemption through acts of decency.",
      genre: "Drama",
      directorBio:
        "Frank Darabont is an American director and screenwriter, known for adapting Stephen King's work.",
    },
    {
      id: 3,
      title: "The Matrix",
      image: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
      director: "The Wachowskis",
      description:
        "A computer hacker learns the true nature of reality and his role in the war against its controllers.",
      genre: "Action / Sci-Fi",
      directorBio:
        "Lana and Lilly Wachowski are filmmakers known for pushing boundaries in sci-fi with The Matrix trilogy.",
    },
    {
      id: 4,
      title: "Parasite",
      image: "https://m.media-amazon.com/images/I/71c8kbyiG0L._AC_SY679_.jpg",
      director: "Bong Joon-ho",
      description:
        "A poor family's scheme to infiltrate a wealthy household spirals out of control.",
      genre: "Thriller / Drama",
      directorBio:
        "Bong Joon-ho is an Oscar-winning South Korean director known for blending social themes with dark humor.",
    },
    {
      id: 5,
      title: "The Godfather",
      image: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg",
      director: "Francis Ford Coppola",
      description:
        "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      genre: "Crime / Drama",
      directorBio:
        "Francis Ford Coppola is an iconic American director, best known for The Godfather trilogy and Apocalypse Now.",
    },
  ]);

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

  // If there are no movies in the list, show a fallback message
  if (movies.length === 0) {
    return <div>The List is Empty!</div>;
  }

  // If no movie is selected, show a list of MovieCard components (one per movie)
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id} // Unique key to help React track each item
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