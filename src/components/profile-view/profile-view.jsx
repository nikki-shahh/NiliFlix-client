import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Card, CardDeck, Form, Navbar, Row } from 'react-bootstrap';
import "./profile-view.scss";
import FavoriteMovies from "./favorite-movies";

export class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: null,
            Username: null,
            Password: null,
            Email: null,
            Birthdate: null,
            FavoriteMovies: [],
            validated: null,
        };
    }
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }


    // get user method
    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://niliflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    Name: response.data.Name,
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthdate: response.data.Birthdate,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    removeFavouriteMovie() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');


        axios.delete(`https://niliflix.herokuapp.com/users/${username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert('Movie was removed');
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthdate) {
        this.setState({
            validated: null,
        });

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                validated: true,
            });
            return;
        }
        e.preventDefault();

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.put(`https://niliflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                Name: newName ? newName : this.state.Name,
                Username: newUsername ? newUsername : this.state.Username,
                Password: newPassword ? newPassword : this.state.Password,
                Email: newEmail ? newEmail : this.state.Email,
                Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
            },
        })
            .then((response) => {
                alert('Saved Changes');
                this.setState({
                    Name: response.data.Name,
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthdate: response.data.Birthdate,
                });
                localStorage.setItem('user', this.state.Username);
                window.open(`/users/${username}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    setName(input) {
        this.Name = input;
    }

    setUsername(input) {
        this.Username = input;
    }

    setPassword(input) {
        this.Password = input;
    }

    setEmail(input) {
        this.Email = input;
    }

    setBirthdate(input) {
        this.Birthdate = input;
    }
    handleDeleteUser(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.delete(`https://niliflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                alert('Your account has been deleted.');
                window.open(`/`, '_self');
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { movies } = this.props;
        const { validated } = this.state;
        const favoriteMovieList = movies.filter((movies) => { });
        return (
            <div>
                <Navbar></Navbar>
                <br></br>
                <br></br>
                <Row className="profile-view">
                    <Card className="profile-card">
                        <h2>Your Favorites Movies</h2>
                        <Card.Body>
                            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
                        </Card.Body>
                        <h1 className="section">Update Profile</h1>
                        <Card.Body>
                            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthdate)}>

                                <Form.Group controlId="formName">
                                    <Form.Label className="form-label">Name</Form.Label>
                                    <Form.Control type="text" placeholder="Change Name" onChange={(e) => this.setName(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label className="form-label">Username</Form.Label>
                                    <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label className="form-label">
                                        Password<span className="required">*</span>
                                    </Form.Label>
                                    <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="form-label">Email</Form.Label>
                                    <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicBirthday">
                                    <Form.Label className="form-label">Birthdate</Form.Label>
                                    <Form.Control type="date" placeholder="Change Birthdate" onChange={(e) => this.setBirthdate(e.target.value)} />
                                </Form.Group>

                                <Button variant='danger' type="submit">
                                    Update
                                </Button>
                                <h3>Delete your Account</h3>
                                <Card.Body>
                                    <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                                        Delete Account
                                    </Button>
                                </Card.Body>
                            </Form>

                        </Card.Body>
                    </Card>
                </Row >
            </div>
        );
    }
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        FavoriteMovies: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                Title: PropTypes.string.isRequired,
            })
        ),
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string,
    }),
};