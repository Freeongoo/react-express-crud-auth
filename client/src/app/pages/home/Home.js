import React, {Component} from 'react'
import './Home.css'
import Navigation from "../../components/nav/Navigation"
import List from "../../components/user/List"
import Api from "../../api/Api"

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
                    <List userList={this.state.userList} />
                </div>

            </div>
        )
    }
}

export default Home
