import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from "url:../../public/apple-touch-icon.png";

import "./navbar-view.scss";

export class NavBar extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    render() {
        const { user } = this.props;

        return (
            <div className="navbar-style">
                <Navbar collapseOnSelect fixed='top' expand="lg" variant="dark">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <img src={Logo} className="logo-header" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                        {
                            user &&
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to="/" className="link-text">
                                    Movies
                                </Nav.Link>

                                <Nav.Link as={Link} to={`/users/${user.Username}`} className="link-text">
                                    Profile
                                </Nav.Link>

                                <Nav.Link to={'/'} onClick={this.onLoggedOut}>
                                    Log Out
                                </Nav.Link>
                            </Nav>
                        }

                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default NavBar;