import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";

class Movielist extends React.Component {
    state = {
        movies: [],
        selectedMovie: {}
    }
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    componentDidMount() {
        if (!localStorage.getItem("user")) {
            alert("You need to log in!");
            return;
        }
        /*getMovies(token) {*/
        axios.get("http://niliflix.herokuapp.com/movies"/*, {
            headers: { Authorization: `Bearer ${token}`}
          }*/)
            .then(response => {
                console.log(response);
                this.setState({
                    movies: response.data
                })
            })
            .catch(err => console.error(err))
    }


    render() {

        return (
            <div>
                <Row className="main-view justify-content-md-center">
                    {
                        this.state.movies.map(movie => (
                            <Col className="movie-card-col mt-2" xs={12} md={8} lg={4} xl={3}>
                                <MovieCard key={movie._id} movie={movie} onMovieClick={this.setSelectedMovie} />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }

}
export default Movielist;