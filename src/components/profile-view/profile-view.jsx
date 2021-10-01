import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './profile-view.scss';
import { Row } from 'react-bootstrap';
import { HeaderComponent } from '../header/HeaderComponent';

export class ProfileView extends React.Component {

    state = {
        username: "",
        password: "",
        email: "",
        birthday: "",
    }

    componentDidMount() {
        if (!localStorage.getItem("user")) {
            alert("You need to log in!");
            return;
        }
        /*getMovies(token) {*/
        axios.get("http://niliflix.herokuapp.com/users/", {
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        })
            .then(response => {
                console.log(response.data);
                let user = response.data.find(x => x.Username === localStorage.getItem("username"))
                console.log("user:", user)
                this.setState({
                    username: user.Username,
                    password: "",
                    email: user.Email,
                    birthday: user.Birthday,
                })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <br></br>
                <br></br>
                <h2>Username: {this.state.username}</h2>
                <br></br>
                <h2>Email: {this.state.email}</h2>
                <br></br>
                <h2>Birthday: {this.state.birthday}</h2>
            </div>
        );
    }
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
    })
};