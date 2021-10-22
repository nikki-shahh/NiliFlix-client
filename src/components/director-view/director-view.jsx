import React from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "./director-view.scss";

export class DirectorView extends React.Component {

    state = {
        director: {},
    }
    name = window.location.href.split("/director-view/")[1];

    componentDidMount() {
        axios.get(`http://niliflix.herokuapp.com/directors/${this.name}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        })
            .then(response => response.data)
            .then(response => this.setState({
                director: { ...response }
            }))
    }

    render() {

        const movies = this.state.director.Movies;

        return (
            < div className="director-view" >

                <div className="director-name">
                    <h4>
                        <div className="value">{this.state.director.Name}</div>
                    </h4>
                </div>
                <br></br>
                <div className="director-bio">
                    <div>Bio:</div>
                    <div className="value">{this.state.director.Bio}</div>
                </div>
                <br></br>
                <div className="director-birth">
                    <div>Birthdate:</div>
                    <div className="value">{this.state.director.Birth}</div>
                </div>
                <br></br>
                <div className="director-movies">
                    <div>Movies:</div>
                    <div className="value">{movies + '.'}</div>
                </div>
                <br></br>

                <Button variant="outline-info" onClick={() => { window.location.replace("/movies") }}>Back to list</Button>

            </div >
        );
    }
}

export default DirectorView;