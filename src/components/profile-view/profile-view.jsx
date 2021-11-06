import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
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
                window.location.reload();
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
                                <UpdateUser handleUpdate={this.handleUpdate} setUsername={this.setUsername} setPassword={this.setPassword} setEmail={this.setEmail} setBirthday={this.setBirthday} handleDeleteUser={this.handleDeleteUser} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <FavoriteMovies favoriteMovies={favoriteMovies} movies={movies} removeFavouriteMovie={this.removeFavouriteMovie} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container>
        );
    }
}
