import React from "react";
import UserInfo from "./user-info";

import {
    Form,
    Button,
    Row,
    Col,
    Figure,
    Card,
    CardGroup,
    Container,
} from "react-bootstrap";

function UpdateUser({ handleSubmit, handleUpdate }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Update</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => handleUpdate(e)}
                                            required
                                            placeholder="Enter a Username"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            onChange={(e) => handleUpdate(e)}
                                            required
                                            minLength="8"
                                            placeholder="Your password must be 8 or more characters"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            onChange={(e) => handleUpdate(e)}
                                            required
                                            placeholder="Enter your email address"
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Update
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateUser;