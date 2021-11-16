import React from "react";

function UserInfo({ username, email, birthday }) {
    const date = new Date(Date(birthday));
    dob = new Intl.DateTimeFormat('en-US').format(date);
    return (
        <>
            <h4>Your Info </h4>
            <div>
                <h6>Name:</h6>
                <p> {username}</p>
                <h6>e-mail:</h6>
                <p> {email}</p>

                <h6>Birthday:</h6>
                <p> {dob}</p>
            </div>
        </>
    );
}

export default UserInfo;