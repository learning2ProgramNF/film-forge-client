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

      {/* Displays the movie director */}
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>

      {/* Displays the director's biography */}
      <div>
        <span>Director Bio: </span>
        <span>{movie.directorBio}</span>
      </div>

      {/* Displays the genre of the movie */}
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>

      {/* A button that triggers the onBackClick function to return to the main view */}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
