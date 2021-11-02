import React from "react";
import { Row, Form, Card, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import axios from "axios";
import UserInfo from "./user-info";
import favoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            username: null,
            Password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
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
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    removeFavouriteMovie(id) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.delete(`https://niliflix.herokuapp.com/users/${username}/movies/` + (id)
            , {
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
    handleUpdate(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.put(`https://niliflix.herokuapp.com/users/${username} `, {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birthday: this.state.birthday
        },
            {
                headers: { Authorization: `Bearer ${token} ` },

            })
            .then((response) => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                });
                localStorage.setItem('user', this.state.username);
                console.log(response.data);
                console.log(this.state.username);
                alert(username + " has been updated!");
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    setUsername(value) {
        this.state.username = value;
    }

    setPassword(value) {
        this.state.password = value;
    }

    setEmail(value) {
        this.state.email = value;
    }

    setBirthday(value) {
        this.state.birthday = value;
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
        const { favoriteMovies, validated } = this.state;
        const { movies } = this.props;
        return (
            <Row className="profile-view">
                <Card className="profile-card">
                    <Card.Body>
                        <h4>Signed in as {this.state.username} </h4>
                        <div>
                            <br></br>
                            <br></br>
                            <h5>Username:</h5>
                            <p> {this.state.username}</p>
                            <br></br>
                            <h5>Email:</h5>
                            <p> {this.state.email}</p>
                            <br></br>
                            <h5>Birthday:</h5>
                            <p> {this.state.birthday}</p>
                        </div>
                    </Card.Body>
                    <Card.Body>
                        <h2>Your Favorites Movies</h2>

                        {favoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

                        <div className="favorites-movies ">
                            {favoriteMovies.length > 0 &&
                                movies.map((movies) => {
                                    if (movies._id === favoriteMovies.find((favMovie) => favMovie === movies._id)) {
                                        return (
                                            <Card className="favorites-item card-content" style={{ width: '16rem' }} key={movies._id}>
                                                <Card.Img style={{ width: '16rem' }} className="movieCard" variant="top" src={movies.ImagePath} />
                                                <Card.Body>
                                                    <Card.Title className="movie-card-title">{movies.Title}</Card.Title>
                                                    <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movies._id} onClick={() => this.removeFavouriteMovie(movies._id)}>
                                                        Remove
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        );
                                    }
                                })}
                        </div>
                    </Card.Body>

                    <Card.Body>
                        <h1 className="section">Update Profile</h1>

                        <Form className="update-form" onSubmit={(e) => this.handleUpdate(e)}>
                            <Form.Group>
                                Username
                                <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
                            </Form.Group>

                            <Form.Group>
                                Password
                                <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />
                            </Form.Group>

                            <Form.Group>
                                Email Address
                                <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />
                            </Form.Group>

                            <Form.Group>
                                Birthday
                                <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
                            </Form.Group>

                            <Button variant='danger' type="submit" >
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
