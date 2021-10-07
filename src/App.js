import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainView from './components/main-view/main-view';
import Movielist from './components/movie-list/movie-list';
import { MovieView } from './components/movie-view/movie-view';
import { RegistrationView } from './components/registration-view/registration-view';
import { ProfileView } from './components/profile-view/profile-view';
import { EditProfileView } from './components/edit-profile/edit-profile-view';
import { DirectorView } from './components/director-view/director-view';
import { GenreView } from './components/genre-view/genre-view';

//Your manager
// administers every route in your app
export default class App extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (
            <BrowserRouter>
                <Route exact={true} path="/">
                    <MainView></MainView>
                </Route>
                <Route exact={true} path="/register">
                    <RegistrationView></RegistrationView>
                </Route>
                <Route exact={true} path="/movies">
                    <Movielist></Movielist>
                </Route>
                <Route exact={true} path="/movie-view/:title">
                    <MovieView></MovieView>
                </Route>
                <Route exact={true} path="/genre-view/:title">
                    <GenreView></GenreView>
                </Route>
                <Route exact={true} path="/director-view/:title">
                    <DirectorView></DirectorView>
                </Route>
                <Route exact={true} path="/profile-view">
                    <ProfileView></ProfileView>
                </Route>
                <Route exact={true} path="/edit-profile-view">
                    <EditProfileView></EditProfileView>
                </Route>
            </BrowserRouter>
        );
    }
}


