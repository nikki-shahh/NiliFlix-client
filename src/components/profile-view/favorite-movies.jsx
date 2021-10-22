import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardDeck, Row } from 'react-bootstrap';
import { Button, Row, Col, Card } from "react-bootstrap";

import "./profile-view.scss";

function FavoriteMovies({ favoriteMovieList }) {
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={12}>
                        <h4>Favorite Movies</h4>
                    </Col>
                </Row>
                <Row>
                    {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
                        return (
                            <CardDeck className="movie-card-deck">
                                <Card className="favorites-item card-content" style={{ width: '16rem' }} key={movie._id}>
                                    <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movie.ImagePath} />
                                    <Card.Body>
                                        <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                                        <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie._id} onClick={(e) => this.removeFavouriteMovie(e, movie)}>
                                            Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        );
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
}

export default FavoriteMovies;