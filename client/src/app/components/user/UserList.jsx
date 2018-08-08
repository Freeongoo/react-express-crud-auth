import React from 'react'
import UserListRow from "./UserListRow";

export default function UserList(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.userList.map((item, index) => (
                    <UserListRow
                        key={item._id}
                        index={++index}
                        data={item}
                        onDelete={props.onDelete}
                    />
                ))}
            </tbody>
        </table>
    )
}
