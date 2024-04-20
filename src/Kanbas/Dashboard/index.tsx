import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { FaEllipsisV, FaPencilAlt, FaRegFileAlt, FaTrash } from "react-icons/fa";
import { RxDotsVertical } from "react-icons/rx";


function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (course: any) => void;
            updateCourse: () => void;
        }) {

    const ellipses_icon = <RxDotsVertical className="fs-3 title-ellipsis-style" />
    const file_icon = <FaRegFileAlt className="fs-4 card-icon-style margin-right-30" />
    const edit_icon = <FaPencilAlt className="fs-4 card-icon-style margin-right-30" />
    const delete_icon = <FaTrash className="fs-4 card-icon-style margin-right-30" />

    return (
        <div className="p-4 dashboard-height-margin">
            <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">Dashboard
                <Link to={``}> {ellipses_icon} </Link>
            </h1>
            <hr />
            <div className="mb-2">
                <h5 className="form-title-style">Add/Update Course</h5>
                <label htmlFor="course_name" className="form-input-label-style">Course Name</label>
                <input id="course_name" value={course.name} className="form-control"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            </div>

            <div className="mb-2">
                <label htmlFor="course_num" className="form-input-label-style">Course Number</label>
                <input id="course_num" value={course.number} className="form-control"
                    onChange={(e) => setCourse({ ...course, number: e.target.value, course_addr: e.target.value + ".202430" })} />
            </div>

            <div className="mb-2">
                <label htmlFor="course_desc" className="form-input-label-style">Course Description</label>
                <input id="course_desc" value={course.short_desc} className="form-control"
                    onChange={(e) => setCourse({ ...course, short_desc: e.target.value })} />
            </div>

            <div className="mb-2">
                <label htmlFor="course_st_dt" className="form-input-label-style">Course Start Date</label>
                <input id="course_st_dt" value={course.startDate} className="form-control" type="date"
                    onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
            </div>

            <div className="mb-2">
                <label htmlFor="course_end_dt" className="form-input-label-style">Course End Date</label>
                <input id="course_end_dt" value={course.endDate} className="form-control" type="date"
                    onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
            </div>
            <button type="button" className="btn dashboard-button-style margin-right-10" onClick={addNewCourse} >
                Add
            </button>
            <button type="button" className="btn dashboard-button-style" onClick={updateCourse} >
                Update
            </button>

            <h2 className="margin-top-30">Published Courses ({courses.length})</h2> <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col col-dimensions">
                            <div className="card">
                                <img src={`/images/${course.image}`} className="card-img-top card-image-dimensions" />
                                <div className="card-body txt-hidden-ellipses-overflow">
                                    <Link className="card-title card-title-style" to={`/Kanbas/Courses/${course._id}/Home`} style={{ color: course.course_title_color }}>
                                        {course.name}
                                    </Link>
                                    <div className="card-text">{course.course_addr}</div>
                                    <div className="card-text card-text-style">{course.short_desc}</div>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}> {file_icon} </Link>
                                    <button type="button" className="icon-button"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}>{edit_icon}</button>
                                    <button type="button" className="icon-button"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }}>{delete_icon}</button>
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
