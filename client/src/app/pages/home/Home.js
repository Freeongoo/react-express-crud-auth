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
    }

    componentDidMount() {
        Api.getUserList((data) => {this.setState({userList: data})})
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
                    <UserList userList={this.state.userList} />
                </div>

            </div>
        )
    }
}

export default Home
