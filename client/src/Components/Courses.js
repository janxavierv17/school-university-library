import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        async function listOfCourses() {
            let response = await fetch("http://localhost:5000/api/courses")
            response = await response.json();
            setData(response.courses)
        }
        listOfCourses();
    }, [])

    return (
        <div >
            <main>
                <div className="wrap main--grid">
                    {data.map(courseDetails =>
                        <Link key={courseDetails.id} to={`/courses/${courseDetails.id}`} >
                            <div className="course--module course--link">
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{courseDetails.title}</h3>
                            </div>
                        </Link>
                    )}

                    <Link to="/course/create" >
                        <div className="course--module course--add--module">
                            <span className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                New Course
                            </span>
                        </div>
                    </Link>

                </div>
            </main>
        </div >
    )
}