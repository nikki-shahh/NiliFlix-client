import React from "react";
import { Row, Form, Button, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import { connect } from 'react-redux';
import { setUser, updateUser } from "../../actions/actions";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import './profile-view.scss';

class ProfileView extends React.Component {
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
            .then((response) => {
                alert('Movie was removed');
                this.setState({
                    favoriteMovies: response.data.FavoriteMovies,
                });

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
            Username: this.state.username,
            Password: this.state.password,
            Email: this.state.email,
            Birthday: this.state.birthday
        },
            {
                headers: { Authorization: `Bearer ${token} ` },

            })
            .then((response) => {
                this.setState({
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
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
        const { favoriteMovies } = this.state;
        const { movies } = this.props;
        return (

            <Container>
                <Row className="profile-view">
                    <Col xs={12} sm={4}>
                        <Card>
                            <Card.Body>
                                <UserInfo username={this.state.username} email={this.state.email} birthday={this.state.birthday} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <h4 className="section">Update Profile</h4>

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
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <h6>Delete your Account</h6>
                                    <Card.Body>
                                        <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                                            Delete Account
                                        </Button>
                                    </Card.Body>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <FavoriteMovies favoriteMovies={favoriteMovies} movies={movies} removeFavouriteMovie={(movieId) => this.removeFavouriteMovie(movieId)} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container>
        );
    }
}
let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);