import React, { Component } from "react"

export default class UserSignIn extends Component {

    state = {
        emailAddress: "",
        password: "",
        errors: []
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { context } = this.props;
        const { emailAddress, password } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        context.actions.signIn(emailAddress, password)
            .then(user => {
                console.log("The user: ", user)
                if (user === null) {
                    this.setState(() => {
                        return { errors: ["Sign-in was unsuccessful."] }
                    })
                } else {
                    console.log("FROM: ", from)
                    this.props.history.push(from);
                    console.log(`SUCCESS ${emailAddress} is now signed in.`)
                }
            }).catch(err => {
                console.log(err)
                this.props.history.push("/error");
            })
    }

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: [value]
            }
        })
    }

    render() {
        console.log(this.state.errors)
        const errors = this.state.errors.map((error, index) => {
            return <li key={index}>{error}</li>
        })
        return (
            <main>
                <div className="form--centered">
                    <h2>Sign in</h2>
                    <div className="validation-errors">
                        {errors && errors.length > 0

                            ? <>
                                <div className="validation--errors">
                                    {errors}
                                </div>
                            </>
                            : null
                        }
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input onChange={this.onChange} value={this.state.emailAddress} id="emailAddress" name="emailAddress" type="email" />
                        <label htmlFor="password">Password</label>
                        <input onChange={this.onChange} value={this.state.password} id="password" name="password" type="password" />
                        <button className="button" type="submit">Sign In</button>
                        <button className="button button-secondary" onClick={() => { this.props.history.push("/") }}>Cancel</button>
                    </form>
                </div>
            </main>
        )
    }

}
