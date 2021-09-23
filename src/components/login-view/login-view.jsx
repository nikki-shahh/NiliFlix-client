import React, { useState } from 'react';
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./login-view.scss";
import { RegistrationView } from "../registration-view/registration-view";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        axios.post("http://niliflix.herokuapp.com/login", {
            Username: username,
            Password: password
        })
            .then(response => {
                console.log(response);
                localStorage.setItem("user", response.data.token)
                history.push("/movies")
            })
            .catch(err => console.error(err))

    };

    return (
        <div className="login-wrapper">
            <Form className="w-25 m-auto">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>
                        Username:
                    </Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-8" controlId="formBasicPassword">
                    <Form.Label>
                        Password:
                    </Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="info" type="submit" onClick={handleSubmit}>Sign in</Button>
            </Form>
            <div className="sign-up">New to Niliflix? <Link to="/register">Sign up here</Link></div>
        </div >

    );
}
LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
}