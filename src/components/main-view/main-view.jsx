import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";

import "./main-view.scss";

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: null
        };
    }

    render() {
        return (
            <Row className="main-view justify-content-md-center">
                <LoginView></LoginView>
            </Row>
        );

    }

}
export default MainView;