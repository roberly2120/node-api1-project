import React from "react";
import User from "./User";

export default function Users (props) {
    const  users  = props.users
    return (
        <div>
            <h2>User Information</h2>
            {users.map(user => {
                return(
                <div>
                    <User user={user} delete={props.delete}/>
                </div>
                )
            })}
        </div>
    )
}