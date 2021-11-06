import React from "react";
import UserInfo from "./user-info";

import { Form, Button, Card } from "react-bootstrap";

function UpdateUser({ handleUpdate, setUsername, setPassword, setEmail, setBirthday, handleDeleteUser }) {
    return (
        <>
            <h4 className="section">Update Profile</h4>

            <Form className="update-form" onSubmit={(e) => handleUpdate(e)}>
                <Form.Group>
                    Username
                    <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    Password
                    <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    Email Address
                    <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    Birthday
                    <Form.Control type='date' name="Birthday" onChange={(e) => setBirthday(e.target.value)} />
                </Form.Group>

                <Button variant='outline-info' type="submit" >
                    Update
                </Button>
                <br></br>
                <br></br>
                <br></br>

                <h6>Delete your Account</h6>
                <Card.Body>
                    <Button variant='outline-danger' onClick={(e) => handleDeleteUser(e)}>
                        Delete Account
                    </Button>
                </Card.Body>
            </Form>
        </>
    );
}

export default UpdateUser;