import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="genre-view">

                <div className="genre-name">
                    <h1>
                        <span className="value">{movie.Genre.Name}</span>
                    </h1>
                </div>
                <div className="genre-description">
                    <span className="value">{movie.Genre.Description}</span>
                </div>

                <button className="primary" onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}


GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }),
};


export default GenreView;