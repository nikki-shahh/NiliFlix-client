import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./movie-view.scss";


export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    addFavorite() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.post(`https:https://niliflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                alert(`Added to Favorites List`)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { movie, onBackClick } = this.props;
        const actors = movie.Actors;

        return (
            <div className="movie-view" >
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-body">
                    <div className="movie-title">
                        <h1>
                            <Badge bg="black">
                                <span className="value">{movie.Title}</span>
                            </Badge>
                        </h1>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </div>
                    <div className="movie-genre">
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button variant="link">Genre: </Button>
                        </Link>
                        <span className="value">{movie.Genre.Name}</span>
                    </div>
                    <div className="movie-director">
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link">Director: </Button>
                        </Link>
                        <span className="value">{movie.Director.Name}</span>
                    </div>
                    <div className="movie-actors">
                        <span className="label">Actors: </span>
                        <span className="value">{actors + '.'}</span>
                    </div>
                    <div className="movie-release">
                        <span className="label">Release: </span>
                        <span className="value">{movie.Release}</span>
                    </div>
                    <div className="movie-rating">
                        <span className="label">Rating: </span>
                        <span className="value">{movie.Rating}</span>
                    </div>
                    <br></br>
                    <Button variant="outline-info" className="fav-button" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
                        Add to Favorites
                    </Button>
                    <br></br>
                    <br></br>
                    <Button variant="outline-light" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
            </div>
        );
    }
}


MovieView.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Release: PropTypes.number,
        Rating: PropTypes.number,
        ImagePath: PropTypes.string.isRequired,
        Featured: propTypes.bool,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired
        }),
        Director: propTypes.shape({
            Name: propTypes.string.isRequired
        }),
        Actors: PropTypes.array.isRequired
    }).isRequired
};
