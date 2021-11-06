import React from "react";
import { Row, Col, Button, Figure } from 'react-bootstrap';
import { Link } from "react-router-dom";



function FavoriteMovies({ favoriteMovies, movies, removeFavouriteMovie }) {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h4>Your Favorites Movies</h4>
                </Col>
            </Row>
            <Row>
                {favoriteMovies.length === 0 ? <div className="text-center">Empty.</div> : null}

                {favoriteMovies.length > 0
                    ?
                    favoriteMovies.map((movieId) => {
                        const movie = movies.find((m) => m._id === movieId);
                        return (
                            <Col xs={12} md={6} lg={3} key={movie._id} className='movie-favorite'>
                                <Figure>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Figure.Image
                                            src={movie.ImagePath}
                                            alt={movie.Title}
                                        />
                                        <Figure.Caption>
                                            <h6 className="movie-card-title">{movie.Title}</h6>
                                        </Figure.Caption>
                                    </Link>
                                    <Button size='sm' className='profile-button remove-favorite' variant='outline-danger' value={movie._id} onClick={() => removeFavouriteMovie(movie._id)}>
                                        Remove from list
                                    </Button>
                                </Figure>
                            </Col>
                        );

                    })

                    : null
                }
            </Row>
        </>
    );
}

export default FavoriteMovies;