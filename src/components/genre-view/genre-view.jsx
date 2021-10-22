import React from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "./genre-view.scss";

export class GenreView extends React.Component {

    state = {
        genre: {},
    }
    name = window.location.href.split("/genre-view/")[1];

    componentDidMount() {
        axios.get(`http://niliflix.herokuapp.com/genres/${this.name}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        })
            .then(response => response.data)
            .then(response => this.setState({
                genre: { ...response }
            }))
    }

    render() {

        return (
            <div className="genre-view">

                <div className="genre-name">
                    <h4>
                        <span className="value">{this.state.genre.Name}</span>
                    </h4>
                </div>
                <div className="genre-description">
                    <span className="value">{this.state.genre.Description}</span>
                </div>

                <Button variant="outline-info" onClick={() => { window.location.replace("/movies") }}>Back to list</Button>

            </div>
        );
    }
}


// GenreView.propTypes = {
//     Genre: PropTypes.shape({
//         Name: PropTypes.string,
//         Description: PropTypes.string
//     }),
// };
export default GenreView;