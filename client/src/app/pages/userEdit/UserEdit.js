import React, {Component} from 'react'
import Navigation from "../../components/nav/Navigation"
import Api from "../../api/Api"
import FormData from "../../components/user/FormData"
import { Redirect, withRouter } from "react-router-dom"

class UserEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                _id: '',
                firstName: '',
                lastName: '',
                email: ''
            },
            isNotFoundUser: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        Api.updateUser(this.state.user._id, this.state.user)
            .then(() => {this.props.history.push('/')})
            .catch((error) => {
                // TODO: correct handle error
                console.log('error', error)
            })
    }

    handleChange (event) {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    componentDidMount() {
        let currentUserId = this.props.match.params.userId

        if (!currentUserId) return

        Api.getUserById(currentUserId)
            .then((data) => {this.setState({user: data})})
            .catch((error) => {
                if (error.response.status === 404) {
                    this.setState({isNotFoundUser: true})
                } else {
                    // TODO: correct handle error
                    console.log('error', error)
                }
            })
    }

    render() {
        let content = this.state.isNotFoundUser ?
            <p>Sorry, user not found</p> :
            <FormData handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user}/>

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

export default withRouter(UserEdit)
