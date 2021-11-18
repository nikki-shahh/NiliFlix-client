import React from 'react';
import { connect } from 'react-redux';
import { Button, Badge } from 'react-bootstrap';
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';
import { setUser } from '../../actions/actions';
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

        axios.post(`https://niliflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setUser(response.data);
                alert(`Added to Favorites List`)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view" >
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-body">
                    <div className="movie-title">
                        <h4>
                            <Badge bg="black">
                                <span className="value">{movie.Title}</span>
                            </Badge>
                        </h4>
                    </div>
                    <br></br>
                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </div>
                    <div className="movie-genre">
                        <span className="label">Genre: </span>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button variant="link">{movie.Genre.Name} </Button>
                        </Link>

                    </div>
                    <div className="movie-director">
                        <span className="label">Director: </span>
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link">{movie.Director.Name} </Button>
                        </Link>

                    </div>
                    <div className="movie-actors">
                        <span className="label">Actors: </span>
                        <span className="value">{movie.Actors + "."}</span>
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
        Release: propTypes.number,
        Rating: propTypes.number,
        ImagePath: propTypes.string.isRequired,
        Featured: propTypes.bool,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired
        }),
        Director: propTypes.shape({
            Name: propTypes.string.isRequired
        }),
        Actors: propTypes.array.isRequired
    }).isRequired
};
export default connect(null, { setUser })(MovieView);