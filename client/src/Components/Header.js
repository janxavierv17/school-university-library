import React, { Component } from "react";
import { Link } from "react-router-dom"
export default class Header extends Component {
    render() {
        const { context } = this.props;

        let authenticatedUser = ""
        if (context.authenticatedUser) {
            authenticatedUser = context.authenticatedUser.firstName
        }

        return (
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                    <nav>
                        {
                            authenticatedUser
                                ?
                                <ul className="header--signedout">
                                    <li>Hello {authenticatedUser} ! </li>
                                    <li><a href="/signout">Sign Out</a></li>
                                </ul>
                                :
                                <ul className="header--signedout">
                                    <li><a href="/signup">Sign Up</a></li>
                                    <li><a href="/signin">Sign In</a></li>
                                </ul>
                        }
                    </nav>
                </div>
            </header>
        )
    }
}