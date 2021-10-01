import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="director-view">

                <div className="director-name">
                    <h1>
                        <span className="value">{movie.Director.Name}</span>
                    </h1>
                </div>
                <div className="director-bio">
                    <span className="value">{movie.Director.Bio}</span>
                </div>

                <div className="director-birthday">
                    <span className="value">{movie.Director.Birth}</span>
                </div>
                <div className="director-movies">
                    <span className="value">{movie.Director.Movies}</span>
                </div>
                <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

            </div>
        );
    }
}
DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.number,
        Movies: PropTypes.array
    }),
};
export default DirectorView;