import React from 'react';
import Navigation from "../../components/nav/Navigation";

export default function NotFound() {
    return (
        <div>
            <Navigation/>

            <div className="main-container container">
                <h1>Page not found</h1>

                <p>This url <b>{window.location.pathname}</b> not exist</p>
            </div>

        </div>
    )
}
