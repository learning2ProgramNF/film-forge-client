import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100' onClick={() => onMovieClick(movie)}>
      <Card.Img variant='top' src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Card.Text>{movie.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string, // note this changed from image to imagePath
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
