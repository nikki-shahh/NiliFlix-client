import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainView from './components/main-view/main-view';
import Movielist from './components/movie-list/movie-list';
import { MovieView } from './components/movie-view/movie-view';
import { RegistrationView } from './components/registration-view/registration-view';

export class App extends React.Component {
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
            </BrowserRouter>
        );
    }
}

