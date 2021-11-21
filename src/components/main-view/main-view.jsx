import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
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
            activeSession: false,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
            this.getMovies(accessToken);
            this.setState(newActiveSession => ({
                activeSession: !newActiveSession
            }));
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
        console.log('render', movies, user);

        if (!user || movies.length === 0) return <Router>
            <Row className="main-view justify-content-md-center">
                <Col>
                    {
                        this.state.activeSession ? <div> Loading ...</div>
                            :
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    }
                </Col>
            </Row>
        </Router>
        return (
            <Router>
                <NavBar user={user.Username} />
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <MoviesList movies={movies} />;
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route exact path='/users/:username' render={({ history }) => {
                        if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
                        if (movies.length === 0) return;
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