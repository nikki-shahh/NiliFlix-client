import React from "react";
import { Row, Form, Card, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import axios from "axios";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: "",
            Password: null,
            Email: null,
            Birthday: null,
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

    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://niliflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {

                this.setState({
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    favoriteMovies: response.data.FavoriteMovies,
                });
                console.log(response)
                console.log(response.data)
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
    handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
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
        } e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.put(`https://niliflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                Username: newUsername ? newUsername : this.state.Username,
                Password: newPassword ? newPassword : this.state.Password,
                Email: newEmail ? newEmail : this.state.Email,
                Birthday: newBirthday ? newBirthday : this.state.Birthday,
            },
        })
            .then((response) => {
                alert('Saved Changes');
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });
                localStorage.setItem('user', this.state.Username);
                window.open(`/users/${username}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
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
        const { FavoriteMovies, validated } = this.state;
        const { movies, users } = this.state;
        return (
            <Row className="profile-view">
                <Card className="profile-card">
                    <div>
                        <br></br>
                        <br></br>
                        <h2>Username: {this.state.username}</h2>
                        <br></br>
                        <h2>Email: {this.state.email}</h2>
                        <br></br>
                        <h2>Birthday: {this.state.birthday}</h2>
                    </div>
                    <h2>Your Favorites Movies</h2>
                    <Card.Body>
                        {FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

                        <div className="favorites-movies ">
                            {FavoriteMovies.length > 0 &&
                                movies.map((movie) => {
                                    if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                                        return (
                                            <CardDeck className="movie-card-deck">
                                                <Card className="favorites-item card-content" style={{ width: '16rem' }} key={movie._id}>
                                                    <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movie.ImagePath} />
                                                    <Card.Body>
                                                        <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                                                        <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie._id} onClick={(e) => this.removeFavouriteMovie(e, movie)}>
                                                            Remove
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </CardDeck>
                                        );
                                    }
                                })}
                        </div>
                    </Card.Body>

                    <h1 className="section">Update Profile</h1>
                    <Card.Body>
                        <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthdate)}>

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