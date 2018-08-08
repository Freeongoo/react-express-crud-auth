import React from 'react'

export default function FormData(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">First Name:</label>
                <div className="col-10">
                    <input required onChange={props.handleChange} className="form-control" name="firstName" type="text" value={props.user.firstName}
                           id="example-text-input"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">Last Name:</label>
                <div className="col-10">
                    <input required onChange={props.handleChange} className="form-control" name="lastName" type="text" value={props.user.lastName}
                           id="example-text-input"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">Email:</label>
                <div className="col-10">
                    <input required onChange={props.handleChange} className="form-control" name="email" type="email" value={props.user.email}
                           id="example-text-input"/>
                </div>
            </div>

            <button type="submit" className="btn btn-success">Save</button>
        </form>
    )
}