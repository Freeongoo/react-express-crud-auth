import React from 'react'

export default function Edit(props) {
    return (
        <form>
            <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">First Name:</label>
                <div className="col-10">
                    <input className="form-control" name="first-name" type="text" value={props.user.firstName}
                           id="example-text-input"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">Last Name:</label>
                <div className="col-10">
                    <input className="form-control" name="last-name" type="text" value={props.user.lastName}
                           id="example-text-input"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">Email:</label>
                <div className="col-10">
                    <input className="form-control" name="email" type="email" value={props.user.email}
                           id="example-text-input"/>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    )
}