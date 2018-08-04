import React, {Component} from 'react'
import Navigation from "../../components/nav/Navigation"
import Api from "../../api/Api"
import FormData from "../../components/user/FormData"
import { Redirect } from "react-router-dom";

class UserCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
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
        Api.createNewUser(this.state.user, () => {this.setState({isRedirectToList: true})})
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

    }

    render() {

        const { isRedirectToList } = this.state;

        if (isRedirectToList) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <Navigation/>

                <div className="main-container container">
                    <h1>Create New User</h1>
                    <FormData handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user}/>
                </div>

            </div>
        )
    }
}

export default UserCreate
