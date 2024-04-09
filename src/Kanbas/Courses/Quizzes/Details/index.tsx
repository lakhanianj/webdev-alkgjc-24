import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css";
import { FaRegCheckCircle, FaCaretDown, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { quizzes } from "../../../Database";
import { useState } from "react";

function QuizDetails() {
    const location = useLocation();
    const { courseId } = useParams();

    const path = useLocation();
    const pathSplit = path.pathname.split('/');
    const lastPathItem = decodeURI(pathSplit[pathSplit.length - 1]);
    const secondLastPathItem = decodeURI(pathSplit[pathSplit.length - 2]);

    const quizList = quizzes.filter(
        (quiz) => quiz.course === courseId && quiz._id === secondLastPathItem
    );

    const quiz = (quizList[0]);
    
    return (
        <div className="margin-left-quiz">
            {/* buttons */}
            <div className="float-right">
                <button type="button" className="btn modules-publish-button-style">
                    <FaRegCheckCircle
                        className="modules-publish-button-icon-style fs-5"
                    />
                    Publish All
                </button>

                <button type="button" className="btn modules-publish-button-style">
                    Preview
                </button>

                <button type="button" className="btn modules-publish-button-style"
                onClick={() => `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`}>
                    <FaPencilAlt
                        className="modules-publish-button-icon-style fs-5"
                    />
                    Edit
                </button>

                <button type="button" className="btn modules-publish-button-style">
                    <FaEllipsisV className="fa fa-ellipsis-v" />
                </button>
            </div>

            <br />
            <hr />

            <h1>{quiz.name}</h1>

            <div className="d-flex" style={{ minHeight: "100%" }}>
                <div>
                    <ul className="quiz-details-titles remove-bullets">
                        <li>Quiz Type</li>
                        <li>Points</li>
                        <li>Assignment Group</li>
                        <li>Shuffle Answers</li>
                        <li>Time Limit</li>
                        <li>Multiple Attempts</li>
                        <li>View Responses</li>
                        <li>Show Correct Answers</li>
                        <li>One Question at a Time</li>
                        <li>Require Respondus Lockdown Browser</li>
                        <li>Required to View Quiz Results</li>
                        <li>Webcam Required</li>
                        <li>Lock Questions After Answering</li>
                    </ul>
                </div>
                <div>
                    <ul className="remove-bullets">
                        <li>{quiz.quizType}</li>
                        <li>{quiz.pts}</li>
                        <li>QUIZZES</li>
                        <li>{quiz.shuffled ? "Yes" : "No"}</li>
                        <li>{quiz.timeLimit + " Minutes"}</li>
                        <li>{quiz.multipleAttempts ? "Yes" : "No"}</li>
                        <li>{quiz.viewResponses ? "Always" : "Never"}</li>
                        <li>{quiz.showCorrectAnswers ? "Immediately" : "Never"}</li>
                        <li>{quiz.oneQuestionAtATime ? "Yes" : "No"}</li>
                        <li>{quiz.lockdown ? "Yes" : "No"}</li>
                        <li>{quiz.requiredToViewResult ? "Yes" : "No"}</li>
                        <li>{quiz.webcamReq ? "Yes" : "No"}</li>
                        <li>{quiz.lockAfterAnswering ? "Yes" : "No"}</li>
                    </ul>
                </div>
            </div>

            <br />
            <div className="d-flex justify-content-around" style={{ minHeight: "100%"}}>
                <div className="text-bold">Due</div>
                <div className="text-bold">For</div>
                <div className="text-bold">Available from</div>
                <div className="text-bold">Until</div>
            </div>
  
            <hr />
       
            <div className="d-flex justify-content-around" style={{ minHeight: "100%"}}>
                <div>{formatDate(new Date(quiz.dueDate))}</div>
                <div>{quiz.forWhom}</div>
                <div>{formatDate(new Date(quiz.availableDate))}</div>
                <div>{formatDate(new Date(quiz.untilDate))}</div>
            </div>
            <hr />
        </div>
    );
}

function formatDate(date: Date) {
    const dateString = date.toDateString();
    const hours = date.getHours();
    let timeString;
    if (hours === 0) {
      timeString = `12:${("0" + date.getMinutes()).slice(-2)}am`; // Midnight
    } else if (hours < 12) {
      timeString = `${hours}:${("0" + date.getMinutes()).slice(-2)}am`; // AM hours
    } else if (hours === 12) {
      timeString = `12:${("0" + date.getMinutes()).slice(-2)}pm`; // Noon
    } else {
      timeString = `${hours - 12}:${("0" + date.getMinutes()).slice(-2)}pm`; // PM hours
    }
    const [month, day] = dateString.split(" ").slice(1, 3); // Extract month and day
    return `${month} ${day} at ${timeString}`;
  }
export default QuizDetails;