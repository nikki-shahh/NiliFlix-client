import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from "url:../../public/niliflix-logo.jpeg";
import "./login-view.scss";

function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        axios.post("http://niliflix.herokuapp.com/login", {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
                alert('Incorrect Username or Password!')
            });
    };

    return (
        <div className="login-wrapper">
            <div className="login-title">Welcome! </div>
            <img src={logo} className="logo" />
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
                <Button variant="info" type="submit" onClick={handleSubmit}>Log in</Button>
            </Form>
            <br></br>
            <br>
            </br>
            <div className="sign-up">New to Niliflix? <Link to="/register">Sign up here</Link></div>
        </div >

    );
}
const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (username, password) => dispatch(handleSubmit(Username, Password))
});

export default connect(null, mapDispatchToProps)(LoginView);