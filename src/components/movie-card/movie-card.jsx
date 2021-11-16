import React from 'react';
import PropTypes from "prop-types";
import { Button, Card } from 'react-bootstrap';
import "./movie-card.scss";
import { Link } from "react-router-dom";


export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Link to={`/movies/${movie._id}`}>
                    <Card.Img className="img-card" variant="top" src={movie.ImagePath} />

                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Button variant="outline-dark">See more</Button>

                    </Card.Body>
                </Link>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired,
    }).isRequired,
};