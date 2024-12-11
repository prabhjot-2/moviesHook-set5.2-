import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [actorDetails, setActorDetails] = useState([]);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:4500/movies');
        setMovies(response.data);
        findActorsWithTwoOrMoreMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Find actors with two or more movies and their details
  const findActorsWithTwoOrMoreMovies = (moviesData) => {
    const actorMovies = {};

    // Group movies by actor
    moviesData.forEach((movie) => {
      if (!actorMovies[movie.actor]) {
        actorMovies[movie.actor] = [];
      }
      actorMovies[movie.actor].push({
        movieName: movie.movieName,
        movieDirector: movie.movieDirector,
      });
    });

    // Filter actors with two or more movies
    const filteredActorDetails = Object.entries(actorMovies)
      .filter(([actor, movies]) => movies.length >= 2)
      .map(([actor, movies]) => ({ actor, movies }));

    setActorDetails(filteredActorDetails);
  };

  return (
    <div>
      <h1>Actors with Two or More Movies</h1>
      {actorDetails.length > 0 ? (
        actorDetails.map((actorDetail, index) => (
          <div key={index}>
            <h2>Actor: {actorDetail.actor}</h2>
            <ul>
              {actorDetail.movies.map((movie, idx) => (
                <li key={idx}>
                  <strong>Movie Name:</strong> {movie.movieName} |{' '}
                  <strong>Director:</strong> {movie.movieDirector}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No actors have two or more movies.</p>
      )}
    </div>
  );
};

export default Movies;
