import React, { Component } from "react"
class UpdateCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        firstName: "",
        lastName: "",
        errors: [],
    }

    getCourse = async () => {
        let response = await fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        response = await response.json();

        this.setState(() => {
            return {
                title: response.course.title,
                description: response.course.description,
                estimatedTime: response.course.estimatedTime,
                materialsNeeded: response.course.materialsNeeded,
                firstName: response.course.User.firstName,
                lastName: response.course.User.lastName,
            }
        })
    }

    componentDidMount() {
        this.getCourse();
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState(() => {
            return {
                [name]: value
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { context } = this.props;
        const { emailAddress, password, id } = context.authenticatedUser;
        const { title, description, estimatedTime, materialsNeeded } = this.state
        const courseID = this.props.match.params.id
        const courseDetails = { id, title, description, estimatedTime, materialsNeeded }

        console.log("The course ID", courseID)
        const userPassword = password[0]
        context.data.updateCourse(courseID, courseDetails, emailAddress, userPassword)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log("Course successfully updated.");
                    this.props.history.push("/")
                }
            })
            .catch((err) => { //handle rejected promises
                console.log("Something went wrong. ", err);
                this.props.history.push('/error');
            })
    }

    render() {
        const bunchOfErrors = this.state.errors.map((error, index) => {
            return <li key={index}>{error}</li>
        })
        return (
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    <div className="validation-errors">
                        {this.state.errors && this.state.errors.length > 0
                            ? <div className="validation--errors">
                                <h3>Validation Errors</h3>
                                {bunchOfErrors}
                            </div>
                            : null
                        }
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="title" type="text" value={this.state.title} onChange={this.handleChange} />

                                <p>By {this.state.firstName} {this.state.lastName}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="description" type="text" value={this.state.description} onChange={this.handleChange} />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" value={this.state.estimatedTime} onChange={this.handleChange} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" type="text" value={this.state.materialsNeeded} onChange={this.handleChange} />

                                <button className="button" type="submit">Update Course</button>
                                <button className="button button-secondary" onClick={() => { this.props.history.push(`/courses/${this.props.match.params.id}`) }}> Cancel</button>
                            </div>


                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default UpdateCourse;