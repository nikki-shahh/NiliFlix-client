import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';
import axios from "axios";

export class GenreView extends React.Component {

    state = {
        genre: {}
    }
    title = window.location.href.split("/movie-view/")[1];

    componentDidMount() {
        axios.get(`http://niliflix.herokuapp.com/movies/${this.title}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        })
            .then(response => response.data)
            .then(response => this.setState({
                genre: { ...response }
            }))
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="genre-view">

                <div className="genre-name">
                    <h1>
                        <span className="value">{this.state.genre.Name}</span>
                    </h1>
                </div>
                <div className="genre-description">
                    <span className="value">{this.state.genre.Name}</span>
                </div>

                <button className="primary" onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}


GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }),
};


export default GenreView;