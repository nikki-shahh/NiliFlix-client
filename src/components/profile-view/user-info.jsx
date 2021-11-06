import React from "react";

function UserInfo({ username, email, birthday }) {
    return (
        <>
            <h4>Your Info </h4>
            <div>
                <h6>Name:</h6>
                <p> {username}</p>
                <h6>e-mail:</h6>
                <p> {email}</p>

                <h6>Birthday:</h6>
                <p> {birthday}</p>
            </div>
        </>
    );
}

export default UserInfo;