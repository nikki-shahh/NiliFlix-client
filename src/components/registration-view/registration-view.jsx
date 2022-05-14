import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import logo from "url:../../public/niliflix-logo.jpeg";



import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [birthdayError, setBirthdayError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let setisValid = formValidation();
        if (setisValid) {
            axios.post('https://niliflix.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
                })
                .catch(e => {
                    console.log('error registering the user')
                });
        };
    }

    const formValidation = () => {
        let usernameError = {};
        let passwordError = {};
        let emailError = {};
        let birthdayError = {};
        let isValid = true;

        if (username.trim().length < 4) {
            usernameError.usernameShort = "Username incorrect. Use at least 4 characters.";
            isValid = false;
        }
        if (password.trim().length < 5) {
            passwordError.passwordMissing = "Password incorrect. Use at least 5 characters.";
            isValid = false;
        }
        if (!(email && email.includes(".") && email.includes("@"))) {
            emailError.emailNotEmail = "Email address incorrect.";
            isValid = false;
        }
        if (birthday === '') {
            birthdayError.birthdayEmpty = "Please enter your birthday.";
            isValid = false;
        }
        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        setBirthdayError(birthdayError);
        return isValid;
    };

    return (
        <Form className="register justify-content-md-center">
            <img src={logo} className="logo" />

            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                {Object.keys(usernameError).map((key) => {
                    return (
                        <div key={key}>
                            {usernameError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Create Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {Object.keys(passwordError).map((key) => {
                    return (
                        <div key={key}>
                            {passwordError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                {Object.keys(emailError).map((key) => {
                    return (
                        <div key={key}>
                            {emailError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                {Object.keys(birthdayError).map((key) => {
                    return (
                        <div key={key}>
                            {birthdayError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <span>
                <Button type="submit" onClick={handleSubmit}>Sign up</Button>
                {' '}
                <br></br>
                <br></br>
                <div className="sign-up">Already registered? Log in <Link to="/">here</Link></div>
            </span>
        </Form >
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired
    }),
};