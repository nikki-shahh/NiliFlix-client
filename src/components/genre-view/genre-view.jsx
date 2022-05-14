import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import "./genre-view.scss";



export function GenreView(props) {
    const { genre, onBackClick } = props
    console.log(genre, 'genre')
    return (
        <>
            <Row className="genre-view">
                <Col>
                    <h4 className="genre-name">
                        <span className="label">Name: </span>
                        <span className="value">{genre.Name}</span>
                    </h4>
                    <br></br>
                    <div className="genre-description">
                        <span className="label">Description: </span>
                        <span className="value">{genre.Description}</span>
                    </div>
                    <Button variant="outline-info" onClick={() => { onBackClick(null); }}>Back</Button>
                </Col>
            </Row>

        </>
    )

}
