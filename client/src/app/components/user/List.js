import React from 'react'
import {Link} from "react-router-dom"

export default function List(props) {
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
            {props.userList.map((item, index) => {
                return (
                    <tr key={item._id}>
                        <th scope="row">{++index}</th>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>
                            <Link className="btn btn-primary" to={"/user/edit/" + item._id}>edit</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
