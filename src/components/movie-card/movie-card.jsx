import React from 'react';
import PropTypes from "prop-types";

//import "./movie-card.scss";

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (
            <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Release: PropTypes.number,
        Rating: PropTypes.number,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.number,
            Movies: PropTypes.array
        }),
        Actors: PropTypes.array.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};