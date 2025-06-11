// Importing the React library, which is necessary to use JSX and React features
import React from "react";

// Importing the useState hook from React to manage component state
import { useEffect, useState } from "react";

// Importing the MovieCard component to display individual movie previews
import { MovieCard } from "../MovieCard/movie-card";

// Importing the MovieView component to display detailed information about a selected movie
import { MovieView } from "../MovieView/movie-view";

// Importing the LoginView component to display the login screen
import { LoginView } from "../LoginView/login-view";

// Importing a SignUp View component to add a Sign Up Page
import { SignUpView } from "../SignUpView/signup-view";

// Importing Prop-Types
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://film-forge-11a9389fe47d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((doc) => ({
          _id: doc._id,
          title: doc.title || "No Title",
          description: doc.description || "No Description",
          imagePath: doc.imagePath || "https://via.placeholder.com/150",
          genre: {
            name: doc.genre?.name || "Unkown",
            description: doc.genre?.description || "",
          },
          director: {
            name: doc.director?.name || "Unkown",
            bio: doc.director?.bio || "",
          },
        }));
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
      });
  }, [token]);

  //Logout Handler 
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setSelectedMovie(null);
    setMovies([]);
  }

  // If no movie is selected, show a list of MovieCard components (one per movie)
  return (
    <Row className='justify-content-md-center'>
      {/* Show logout button if user logged in */}
{user && (
  <Col md={12} style={{ marginBottom: "20px" }}>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <span style={{ marginRight: " 10px" }}>
        Welcome, {user.username}!
      </span>
      <Button variant="outline-danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  </Col>
)}


      {!user ? (
        <>
          <Col md={5}>
            <LoginView onLoggedIn={(user, token) => { 
              setUser(user);
              setToken(token);
            }} />
            
            or
            <SignUpView />
          </Col>
        </>
      ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
            movies={movies}
            onMovieClick={(movie) => setSelectedMovie(movie)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The List is Empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-5' key={movie._id} md={3}>
              <MovieCard
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
