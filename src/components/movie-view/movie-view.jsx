import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import "./movie-view.css";
import axios from 'axios';

export class MovieView extends React.Component {

    state = {
        movie: {},
        onBackClick: null
    };
    movieTitle = window.location.href.split("/movie-view/")[1];

    componentDidMount() {
        axios.get(`http://niliflix.herokuapp.com/movies/${this.movieTitle}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        })
            .then(response => response.data)
            .then(response => this.setState({
                movie: { ...response }
            }))
    }


    render() {

        const genre = { ...this.state.movie.Genre }.Name;
        const director = { ...this.state.movie.Director }.Name;
        // console.log({ ...this.state.movie.Director }.Name)
        return (
            <div className="movie-view" >
                {/*  Nav */}
                < div className="movie-poster" >
                    <img src={this.state.movie.ImagePath} />
                </div>
                <div className="movie-body">
                    <div className="movie-title">
                        <span className="label"></span>
                        <span className="value">{this.state.movie.Title}  </span>
                    </div>
                    <div className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{this.state.movie.Description}</span>
                    </div>
                    <div className="movie-genre">
                        <span className="label">Genre: </span>
                        <span className="link">
                            <Link to={`/genre-view/${genre}`}><span className="value">{genre}</span>
                            </Link>
                        </span>
                    </div>
                    <div className="movie-director">
                        <span className="label">Directed by: </span>
                        <span className="link">
                            <Link to={`/director/${director}`}>  <span className="value">{director}</span>
                            </Link>
                        </span>
                    </div>
                    <div className="movie-actors">
                        <span className="label">Actors: </span>
                        <span className="value">{this.state.movie.Actors}</span>
                    </div>
                    <div className="movie-release">
                        <span className="label">Release: </span>
                        <span className="value">{this.state.movie.Release}</span>
                    </div>
                    <div className="movie-rating">
                        <span className="label">Rating: </span>
                        <span className="value">{this.state.movie.Rating}</span>
                    </div>
                    <br></br>
                    <Button onClick={() => { window.location.replace("/movies") }}>Back</Button>
                </div>
            </div >
        );
    }
}
// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         Description: PropTypes.string.isRequired,
//         Release: PropTypes.number,
//         Rating: PropTypes.number,
//         ImagePath: PropTypes.string.isRequired,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string,
//             Description: PropTypes.string
//         }),
//         Director: PropTypes.shape({
//             Name: PropTypes.string,
//             Bio: PropTypes.string,
//             Birth: PropTypes.number,
//             Movies: PropTypes.array
//         }),
//         Featured: PropTypes.bool.isRequired,
//         Actors: PropTypes.array.isRequired
//     }),
// };