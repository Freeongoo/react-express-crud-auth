import React, {Component} from 'react'
import {Link} from "react-router-dom"

class UserListRow extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.data._id)
    }

    render() {
        const {
            index,
            data,
        } = this.props
        const {
            firstName,
            lastName,
            email,
            _id,
        } = data

        return (
            <tr>
                <th scope="row">{index}</th>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>
                    <Link className="btn btn-primary" to={"/user/" + _id}>edit</Link>
                    &nbsp;
                    <button onClick={this.handleDelete} className="btn btn-danger">delete</button>
                </td>
            </tr>
        )
    }
}

export default UserListRow
