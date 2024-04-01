import { FaBan, FaCaretDown, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { quizzes } from "../../Database";
import { Link, useParams } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function Quizzes() {

    const [contextMenuState, setContextMenuState] = useState<{ [key: string]: boolean }>({});

    const toggleContextMenu = (quizId: string) => {
        setContextMenuState(prevState => ({
            ...prevState,
            [quizId]: !prevState[quizId]
        }));
    };

    const { courseId } = useParams();
    console.log(courseId)
    const quizList = quizzes.filter(
        (quiz) => quiz.course === courseId
    );
    console.log(quizList)

    function formatDate(date: Date) {
        const dateString = date.toDateString();
        const hours = date.getHours();
        let timeString;
        if (hours === 0) {
            timeString = `12:${('0' + date.getMinutes()).slice(-2)}am`; // Midnight
        } else if (hours < 12) {
            timeString = `${hours}:${('0' + date.getMinutes()).slice(-2)}am`; // AM hours
        } else if (hours === 12) {
            timeString = `12:${('0' + date.getMinutes()).slice(-2)}pm`; // Noon
        } else {
            timeString = `${hours - 12}:${('0' + date.getMinutes()).slice(-2)}pm`; // PM hours
        }
        const [month, day] = dateString.split(' ').slice(1, 3); // Extract month and day
        return `${month} ${day} at ${timeString}`;
    }

    function quizAvailability(quiz: {
        _id: string;
        course: string;
        name: string;
        dueDate: string;
        availableDate: string;
        pts: string;
        numQuestions: string;
        published: string;
    }) {
        const due = new Date(quiz.dueDate)
        const available = new Date(quiz.availableDate)
        const cur = new Date()

        if (cur > due) {
            return "\nClosed"
        } else if (cur < available) {
            return "\nNot available until "
        } else {
            return "\nAvailable"
        }

    }

    return (
        <>
            {/* Buttons */}
            <div>
                <div className="flex-row-structure flex-fill margin-0">
                    <div className="float-left">
                        <input type="textbox"
                            className="form-control"
                            id="input1"
                            placeholder="Search For Quiz">
                        </input>
                    </div>

                    <div className="float-right assignments-float-right-buttons">
                        <button type="button" className="btn modules-module-button-style">
                            + Quiz
                        </button>

                        <button type="button" className="btn modules-publish-button-style">
                            <FaEllipsisV className="fa fa-ellipsis-v" />
                        </button>
                    </div>
                </div>

                <hr className="courses-column-hr-style" />

                <ul className="list-group wd-modules">
                    <li className="list-group-item">
                        <div className="list-group-header-style">
                            <FaCaretDown className="no-left-padding-margin me-2" />

                            <span className="list-group-title-style">Quizzes</span>
                            <span className="float-end">
                            </span>
                        </div>

                        <ul className="list-group">
                            {quizList.map((quiz) => (
                                <li className="list-group-item top-bottom-padding-10">
                                    <BsRocketTakeoff className="no-right-padding-margin text-success" />
                                    <Link className="assignment-item-style"
                                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>{quiz.name}
                                    </Link>
                                    <br />

                                    <span className="small-bold-quiz-text">{quizAvailability(quiz)}</span>
                                    <span className="small-text">{quizAvailability(quiz) == "\nNot available until " ? formatDate(new Date(quiz.availableDate)) : ""}</span>
                                    <span className="small-gray-assignment-text">|</span>
                                    <span className="small-gray-assignment-text bold-text ">Due </span>
                                    <span className="small-text">{formatDate(new Date(quiz.dueDate))}</span>
                                    <span className="small-gray-assignment-text">|</span>
                                    <span className="small-gray-assignment-text">{quiz.pts} pts</span>
                                    <span className="small-gray-assignment-text">|</span>
                                    <span className="small-gray-assignment-text">{quiz.numQuestions} questions</span>

                                    <span className="float-end">
                                        {quiz.published == "True" ? (
                                            <FaCheckCircle className="text-success" />
                                        ) : (
                                            <FaBan />
                                        )}
                                        <button className="left-margin-smaller" onClick={() => toggleContextMenu(quiz._id)}>
                                            <button type="button" className="btn modules-publish-button-style">
                                                <FaEllipsisV className="fa fa-ellipsis-v" />
                                            </button>
                                        </button>
                                    </span>
                                    {contextMenuState[quiz._id] && (
                                        <div className="float-end">
                                            <br></br>
                                            <div className="button-group">
                                                <button className="btn rounded blue-button modules-module-button-style">Edit</button>
                                                <button className="btn rounded modules-module-button-style">Delete</button>
                                                <button className="btn rounded green-button modules-module-button-style">{quiz.published == "True" ? "Unpublish" : "Publish"}</button>
                                            </div>
                                        </div>
                                    )}

                                </li>))}
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Quizzes;