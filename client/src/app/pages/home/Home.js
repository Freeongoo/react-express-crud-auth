import React, {Component} from 'react'
import './Home.css'
import Navigation from "../../components/nav/Navigation"
import Api from "../../api/Api"
import {Link} from "react-router-dom"
import UserList from "../../components/user/UserList"

class Home extends Component {

    constructor() {
        super()
        this.state = {
            userList: []
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        Api.getUserList()
            .then((data) => {this.setState({userList: data})})
            .catch((error) => {
                // TODO: correct handle error
                console.log('error', error)
            })
    }

    handleDelete(userId) {
        if (!window.confirm("Are you sure you want to delete?")) return;

        Api.deleteUser(userId)
            .then(() => {
                this.setState({userList: this.state.userList.filter(function(user) {
                    return user._id !== userId
                })});
            })
            .catch((error) => {
                // TODO: correct handle error
                console.log('error', error)
            })
    }

    render() {
        return (
            <div>
                <Navigation/>

                <div className="main-container container">
                    <h1>User list</h1>
                    <div className="form-group">
                        <Link className="btn btn-success" to={"/create"}>Create New User</Link>
                    </div>
                    <UserList handleDelete={this.handleDelete} userList={this.state.userList} />
                </div>

            </div>
        )
    }
}

export default Home
