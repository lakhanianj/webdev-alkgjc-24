import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import "./index.css";
import { FaRegFileAlt } from "react-icons/fa";
import { RxDotsVertical } from "react-icons/rx";


function Dashboard() {
    const ellipses_icon = <RxDotsVertical className="fs-3 title-ellipsis-style" />
    const file_icon = <FaRegFileAlt className="fs-3 card-icon-style" />
    return (
        <div className="p-4 dashboard-height-margin">
            <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">Dashboard
                <Link to={``}> {ellipses_icon} </Link>
            </h1>
            <hr />
            <h2>Published Courses ({courses.length})</h2> <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course: any) => (
                        <div key={course._id} className="col col-dimensions">
                            <div className="card">
                                <img src={`/images/${course.image}`} className="card-img-top card-image-dimensions" alt="Course Logo" />
                                <div className="card-body txt-hidden-ellipses-overflow">
                                    <Link className="card-title card-title-style" to={`/Kanbas/Courses/${course._id}/Home`} style={{ color: course.course_title_color }}>
                                        {course.name}</Link>
                                    <div className="card-text">{course.course_addr}</div>
                                    <div className="card-text card-text-style">{course.short_desc}</div>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}> {file_icon} </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
