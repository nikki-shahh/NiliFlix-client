import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Header.css";

export class HeaderComponent extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <ul className="nav">
                        <li><Link to="/movies">Home</Link></li>
                        <li><Link to="/profile-view">View Profile</Link></li>
                        <li><Link to="/edit-profile-view">Edit Profile</Link></li>
                        <li><Link to="">Sign out</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

