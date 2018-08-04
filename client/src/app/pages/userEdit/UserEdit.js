import React, {Component} from 'react'
import Navigation from "../../components/nav/Navigation"
import Api from "../../api/Api"
import _ from 'lodash'
import FormData from "../../components/user/FormData"

class UserEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    }

    componentDidMount() {
        let currentUserId = this.props.match.params.userId

        if (currentUserId)
            Api.getUserById(currentUserId, (data) => {this.setState({user: data})})
    }

    render() {

        let content = _.isEmpty(this.state.user) ?
            <p>Sorry, user not found</p> :
            <FormData user={this.state.user}/>

        return (
            <div>
                <Navigation/>

                <div className="main-container container">
                    <h1>Edit User</h1>
                    {content}
                </div>

            </div>
        )
    }
}

export default UserEdit
