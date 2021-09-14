import React from 'react';
import PropTypes from "prop-types";

//import "./movie-view.scss";

export class MovieView extends React.Component {

    constructor() {
        super();
        this.state = {
            movie: [],
            onBackClick: null
        };
    }
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-body">
                    <div className="movie-title">
                        <span className="label">Title: </span>
                        <span className="value">{movie.Title}</span>
                    </div>
                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </div>
                    <div className="movie-genre">
                        <span className="label">Genre: </span>
                        <span className="value">{movie.Genre}</span>
                    </div>
                    <div className="movie-director">
                        <span className="label">Director: </span>
                        <span className="value">{movie.Director}</span>
                    </div>
                    <div className="movie-actors">
                        <span className="label">Actors: </span>
                        <span className="value">{movie.Actors}</span>
                    </div>
                    <div className="movie-release">
                        <span className="label">Release: </span>
                        <span className="value">{movie.release}</span>
                    </div>
                    <div className="movie-rating">
                        <span className="label">Rating: </span>
                        <span className="value">{movie.Rating}</span>
                    </div>
                    <button onClick={() => { onBackClick(null) }}>Back</button>
                </div>
            </div>
        );
    }
}
MovieView.propTypes = {
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
        Featured: PropTypes.bool.isRequired,
        Actors: PropTypes.array.isRequired
    }),
};