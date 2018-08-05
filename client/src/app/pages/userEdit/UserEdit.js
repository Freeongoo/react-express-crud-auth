import React, {Component} from 'react'
import Navigation from "../../components/nav/Navigation"
import Api from "../../api/Api"
import _ from 'lodash'
import FormData from "../../components/user/FormData"
import { Redirect } from "react-router-dom"

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
            isRedirectToList: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        Api.updateUser(this.state.user._id, this.state.user, () => {this.setState({isRedirectToList: true})})
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

        if (currentUserId)
            Api.getUserById(currentUserId, (data) => {this.setState({user: data})})
    }

    render() {

        const { isRedirectToList } = this.state;

        if (isRedirectToList) {
            return <Redirect to="/" />;
        }

        let content = _.isEmpty(this.state.user) ?
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

export default UserEdit
