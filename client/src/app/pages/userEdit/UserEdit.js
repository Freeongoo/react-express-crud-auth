import React, {Component} from 'react'
import Navigation from "../../components/nav/Navigation"
import Edit from "../../components/user/Edit"
import Api from "../../api/Api"
import _ from 'lodash'

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

        let content

        if (_.isEmpty(this.state.user))
            content = <p>Sorry, user not found</p>
        else
            content = <Edit user={this.state.user}/>

        return (
            <div>
                <Navigation/>

                <div className="main-container container">
                    {content}
                </div>

            </div>
        )
    }
}

export default UserEdit
