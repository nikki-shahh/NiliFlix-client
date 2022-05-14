import React from 'react';
import Button from 'react-bootstrap/Button';

import "./director-view.scss";

export function DirectorView(props) {
    const { director, onBackClick } = props;
    console.log(director);
    return (
        < div className="director-view" >

            <div className="director-name">
                <h4>
                    <span className="value">{director.Name}</span>
                </h4>
            </div>
            <br></br>
            <div className="director-bio">
                <div>Biography:</div>
                <span className="value">{director.Bio}</span>                </div>
            <br></br>
            <div className="director-birth">
                <div>Year of Birth:</div>
                <span className="value">{director.Birth}</span>                </div>
            <br></br>
            <div className="director-movies">
                <div>Movies:</div>
                <div className="value">{director.Movies + "."}</div>
            </div>
            <br></br>

            <Button variant="outline-info" onClick={() => { onBackClick(null); }}>Back</Button>

        </div >
    )
}
