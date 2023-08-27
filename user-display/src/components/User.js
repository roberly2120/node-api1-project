import React from "react";

export default function User (props) {
    const {id, name, bio} = props.user

    const deleteHandler = (id) => {
        console.log(id)
        props.delete(id);
    }
    return (
        <div>
            <h3>Name: {name}</h3>
            <h3>Bio: {bio}</h3>
            <button id={id} onClick={() => deleteHandler(id)}>Delete User</button>
        </div>
    )
}