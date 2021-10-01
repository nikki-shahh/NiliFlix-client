import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import { HeaderComponent } from '../header/HeaderComponent';

export class EditProfileView extends React.Component {

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
                const user = response.data.find(x => x.Username === localStorage.getItem("username"))
                this.setState({
                    username: user.Username,
                    password: "",
                    email: user.Email,
                    birthday: user.Birthday,
                })
            })
            .catch(err => console.error(err))
    }



    setForm = (evt) => {
        const { name, value } = evt.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault();
        axios.put("http://niliflix.herokuapp.com/users/" + this.state.username, {
            Username: this.state.username,
            Password: this.state.password,
            Email: this.state.email,
            Birthday: this.state.birthday
        },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
            })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert("Updated!")
                }
                localStorage.setItem("userObj", JSON.stringify(response.data))
            })
            .catch(err => console.error(err))
    };

    deregister = () => {

        axios.delete("http://niliflix.herokuapp.com/users/" + localStorage.getItem("username"), {
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        })
            .then(response => {
                console.log(response.data);
                if (response.status === 200) alert("user profile deleted")
                window.location.replace("/")
            })
            .catch(err => console.error(err))
    }

    render() {
        const { user } = JSON.parse(localStorage.getItem("userObj"));
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <br></br>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    Username: <input name="username" type="text" value={this.state.username} onChange={e => this.setForm(e)}></input>
                    <br></br>
                    Email: <input name="email" type="text" value={this.state.email} onChange={e => this.setForm(e)}></input>
                    <br></br>
                    Password: <input name="password" type="text" value={this.state.password} onChange={e => this.setForm(e)}></input>
                    <br></br>
                    Birthday: <input name="birthday" type="text" value={this.state.birthday} onChange={e => this.setForm(e)}></input>
                    <br></br>
                    <input type="submit" value="Submit"></input>
                    <br></br>
                    <hr />
                    <input type="button" value="Deregister user" onClick={this.deregister}></input>
                </form>
            </div>
        );
    }
}

