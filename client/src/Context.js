import React, { Component } from "react";
import Data from "./Helper/Data"
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();

        this.data = new Data();
    }

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        courseDetails: null,
    }

    render() {
        const { authenticatedUser } = this.state;
        const value = {
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            },
            data: this.data,
            authenticatedUser: authenticatedUser
        }

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }

    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);

        if (user !== null) {
            this.setState(() => {
                user.password = password;
                return { authenticatedUser: user, };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
    }

    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null,
            }
        });

        Cookies.remove('authenticatedUser')
    }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
export default function withContext(Component) {
    return function contextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}