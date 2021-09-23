import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";

class Movielist extends React.Component {
    state = {
        movies: []
    }
    componentDidMount() {
        if (!localStorage.getItem("user")) {
            alert("You need to log in!");
            return;
        }
        axios.get("http://niliflix.herokuapp.com/movies")
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
            <Row className="main-view justify-content-md-center">

                {/* // <Col md={8}>
                        //     <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        // </Col> */}
                {
                    this.state.movies.map(movie => (
                        <Col className="movie-card-col mt-2" xs={12} md={8} lg={4} xl={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    ))
                }
            </Row>
        );

    }

}
export default Movielist;