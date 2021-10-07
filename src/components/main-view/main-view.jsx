import React from 'react';
import Row from 'react-bootstrap/Row';

import { LoginView } from "../login-view/login-view";

import "./main-view.css";

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