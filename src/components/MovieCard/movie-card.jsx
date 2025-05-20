// Importing Prop-Types
import PropTypes from "prop-types";
import { MovieView } from "../MovieView/movie-view";

// Exports the MovieCard component, which receives a movie object and a click handler as props
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    // When the entire card is clicked, it calls the onMovieClick function and passes the movie as an argument
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {/* Displays the movie title */}
      {movie.title}
    </div>
  );
};

// Here is where we will define all the constraints for MovieCard
MovieView.propTypes = {
  // The `movie` prop must be an object with a specific shape
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
