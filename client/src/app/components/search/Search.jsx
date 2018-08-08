import React, {Component} from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSearch (event) {
        event.preventDefault()

        // TODO: prevent call onSearch - when not changed query

        this.props.onSearch(this.state.query)
    }

    handleChange (event) {
        this.setState({query: event.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSearch} className="form-inline my-2 my-lg-0">
                <input onChange={this.handleChange} name="query" className="form-control mr-sm-2" type="search" value={this.state.input} placeholder="Search"
                       aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
}