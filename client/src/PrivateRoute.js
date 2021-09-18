import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            {/* 
        Utilizes render prop to render either the protected component or a redirect. 
        The state property holds information about the user's current location (i.e., the current browser URL).
        That way, if authentication is successful, the router can redirect the user back to the original location (from: props.location).
        */}
            { context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser
                        ? (<Component {...props} />)
                        : (<Redirect to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }} />)}
                />
            )}
        </Consumer>
    );
};