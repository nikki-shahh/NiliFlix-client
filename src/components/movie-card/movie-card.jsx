import React from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./movie-card.scss";
import { useHistory } from 'react-router-dom';


export function MovieCard(props) {
    const { movie, onMovieClick } = props;
    const history = useHistory();

    const seeMore = (movie) => {
        // const str = `movie title: ${movie.Title} <br>
        //             description:  ${movie.Description} <br>
        //             director: ${movie.Director.Name} <br>
        //             genre: ${movie.Genre.Name} <br>
        //             `;

        // alert(JSON.stringify(str));
        history.push(`movie-view/${movie.Title}`)
    }


    return (
        <Card className="movie-card">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => seeMore(movie)} variant="link">See more</Button>
            </Card.Body>
        </Card>
    );
}


MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Release: PropTypes.number,
        Rating: PropTypes.number,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.number,
            Movies: PropTypes.array
        }),
        Actors: PropTypes.array.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};