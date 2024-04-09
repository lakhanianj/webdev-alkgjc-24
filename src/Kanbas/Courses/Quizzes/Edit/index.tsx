import React, { useState } from "react";
import { FaCheck, FaEllipsisV, FaWindowClose } from "react-icons/fa";
import "./index.css";
import "../../../Courses/index.css";
import EditDetails from "./EditDetails";
import { KanbasState } from "../../../store";
import { useSelector } from "react-redux";

function QuizzesEdit() {
  // Details tab is the default tab and is the active tab when activeTab is true.
  // When activeTab is false, Questions is the active tab
  const [activeTab, setActiveTab] = useState(true);

  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

  return (
    <>
      <div className="d-flex justify-content-end">
        <h3 className="pe-2">Points</h3>
        <h3 className="pe-5">{quiz.pts}</h3>
        <span className="pe-4">
          {quiz.published ? (
            <h4>
              <FaCheck className="text-success" /> Published
            </h4>
          ) : (
            <h4>
              <FaWindowClose /> Not Published
            </h4>
          )}
        </span>
        <button type="button" className="btn modules-buttons-styles">
          <FaEllipsisV />
        </button>
      </div>

      {/* tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            type="button"
            className={`${
              activeTab ? "wd-quiz-tabs-active active" : "wd-quiz-text-icons"
            } nav-link`}
            onClick={() => setActiveTab(true)}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`${
              !activeTab ? "wd-quiz-tabs-active active" : "wd-quiz-text-icons"
            } nav-link`}
            onClick={() => setActiveTab(false)}
          >
            Questions
          </button>
        </li>
      </ul>

      {/* content within tabs */}
      {activeTab ? <EditDetails /> : <h1>Questions</h1>}
    </>
  );
}

export default QuizzesEdit;
