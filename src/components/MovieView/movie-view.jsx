// Exports the MovieView component, which takes in a movie object and a back button handler as props
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      {/* Displays the movie's image */}
      <div>
        <img src={movie.image} />
      </div>
      {/* Displays the movie title */}
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      {/* Displays the movie description */}
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      {/* Displays the genre of the movie */}
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      {/* Displays the movie director */}
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      {/* Displays the director's biography */}
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.name}</span>
        <span>{movie.director.bio}</span>
      </div>
      {/* A button that triggers the onBackClick function to return to the main
      view */}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

// Here is where we will define all the constraints for MovieCard
MovieCard.propTypes = {
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