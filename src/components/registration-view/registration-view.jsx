import React, { useState } from 'react';
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import "./registration-view.scss";
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://niliflix.herokuapp.com/users", {
            Username: username,
            Password: password,
            Email: email,
            Birthdat: birthday
        })
            .then(response => {
                console.log(response);
                history.push("/")
            })
            .catch(err => console.error(err))
    };

    return (
        <div className=" registration-view mt-5">
            <Form className="w-26 m-auto">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>
                        Username:
                    </Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                        Password:
                    </Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Birthday:
                    </Form.Label>
                    <Form.Control type="date" placeholder="Birthdate" onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Button variant="info" type="submit" onClick={handleSubmit}>
                    Sign up
                </Button>
            </Form>
            <div className="sign-up">Already registered? <Link to="/">Log in here</Link></div>
        </div>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
    }),
};