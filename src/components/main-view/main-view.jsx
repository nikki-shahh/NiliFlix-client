import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginView from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';
import { setMovies, setFilter, setUser } from '../../actions/actions';
import './main-view.scss';
import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            activeSession: true,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
            this.getMovies(accessToken);
        } else {
            this.setState({
                activeSession: false
            });
        }
    }

    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://niliflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.props.setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Log In
    onLoggedIn(authData) {
        console.log(authData);
        this.props.setUser(authData.user);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    //log out
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser(null);

    }

    //   Get all movies in DB
    getMovies(token) {
        axios.get('https://niliflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        let { movies, user } = this.props;
        console.log('render', movies, user, ((!user || movies.length === 0) && this.state.activeSession));
        if ((!user || movies.length === 0) && this.state.activeSession) return (
            <Row className="main-view justify-content-md-center">
                <Col>
                    <div class="m-5 d-flex justify-content-center">
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="light" />
                    </div>
                </Col>
            </Row>);

        return (
            <Router>
                <NavBar user={user} />
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <MoviesList movies={movies} />;
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Redirect to="/" />
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Redirect to="/" />
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Redirect to="/" />
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route exact path='/users/:username' render={({ history }) => {
                        if (!user) return <Redirect to="/" />
                        return <ProfileView history={history} movies={movies} />
                    }} />
                </Row>
            </Router >
        );
    }
};
let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { setMovies, setFilter, setUser })(MainView);