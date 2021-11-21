import React from "react";
import { Row, Form, Button, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import { connect } from 'react-redux';
import { setUser } from "../../actions/actions";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import './profile-view.scss';

class ProfileView extends React.Component {

    removeFavouriteMovie(id) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.delete(`https://niliflix.herokuapp.com/users/${username}/movies/` + (id)
            , {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert('Movie was removed');
                this.props.setUser(response.data);
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
            Username: this.Username || this.props.user.Username,
            Password: this.Password || this.props.user.Password,
            Email: this.Email || this.props.user.Email,
            Birthday: this.Birthday || this.props.user.Birthday
        },
            {
                headers: { Authorization: `Bearer ${token} ` },

            })
            .then((response) => {
                this.props.setUser(response.data);
                localStorage.setItem('user', response.data.Username);
                alert(username + " has been updated!");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
        this.Username = value;
    }

    setPassword(value) {
        this.setState({
            Password: value
        });
        this.Password = value;
    }

    setEmail(value) {
        this.setState({
            Email: value
        });
        this.Email = value;
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
        this.Birthday = value;
    }

    handleDeleteUser(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.delete(`https://niliflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                this.props.setUser(null);
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
        const { movies, user } = this.props;

        return (

            <Container>
                <Row className="profile-view">
                    <Col xs={12} sm={4}>
                        <Card>
                            <Card.Body>
                                <UserInfo username={user.Username} email={user.Email} birthday={user.Birthday} />
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
                                <FavoriteMovies favoriteMovies={user.FavoriteMovies} movies={movies} removeFavouriteMovie={(movieId) => this.removeFavouriteMovie(movieId)} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >
        );
    }
}
let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser })(ProfileView);