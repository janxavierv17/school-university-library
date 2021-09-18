import React, { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom"

export default function CourseDetail(props) {

    const id = props.match.params.id
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [courseID, setCourseID] = useState(null)
    const [userID, setUserID] = useState()

    function deleteCourse() {
        let context = props.context;
        context.data.deleteCourse(id, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
            .then(errors => {
                if (errors.length === 0) {
                    window.location.reload();
                } else {
                    props.history.push('/error');
                }
            })
    }

    useEffect(() => {
        const fetchCourse = async () => {
            let response = await fetch(`http://localhost:5000/api/courses/${id}`)
            response = await response.json();
            setData(response)
            setLoading(false)
            setCourseID(response.course.id)
            setUserID(response.course.User.id)
        }
        fetchCourse();
    }, [id])

    let materialsNeeded = ''
    if (!loading && materialsNeeded === null) {
        props.history.push("/not-found")
    }

    if (!loading && data.course.materialsNeeded !== null) {
        materialsNeeded = <ReactMarkdown>{data.course.materialsNeeded}</ReactMarkdown>
    }
    const authenticatedUser = props.context.authenticatedUser
    const authorized = authenticatedUser && (authenticatedUser.id === userID)
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {
                        authorized
                            ? <>
                                <div className="button">
                                    <Link to={`${courseID}/update`}>Update Course</Link>
                                </div>
                                <div className="button">
                                    <Link to="/" onClick={deleteCourse}>Delete Course</Link>
                                </div>
                                <div className="button button-secondary">
                                    <Link to="/">Return to List</Link>
                                </div>
                            </>
                            : <div className="button button-secondary">
                                <Link to="/">Return to List</Link>
                            </div>
                    }

                </div>
            </div>

            <div className="wrap" >
                {loading
                    ? <h1>Loading ...</h1>
                    : <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{data.course.title}</h4>
                            <p>By: {data.course.User.firstName} {data.course.User.lastName}</p>
                            <ReactMarkdown >{data.course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail-title">Estimated Time</h3>
                            <p>{data.course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail-list">
                                {materialsNeeded}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </main>

    )
}
