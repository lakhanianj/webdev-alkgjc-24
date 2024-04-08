import React, { useState } from "react";
import { FaEllipsisV, FaWindowClose } from "react-icons/fa";
import "./index.css";
import "../../../Courses/index.css";
import EditDetails from "./EditDetails";
import EditQuestions from "./EditQuestions";
import { updateQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";

function QuizzesEdit() {
  // Details tab is the default tab and is the active tab when activeTab is true.
  // When activeTab is false, Questions is the active tab
  const [activeTab, setActiveTab] = useState(true);
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const dispatch = useDispatch();


  return (
    <>
      <div className="d-flex justify-content-end">
        <h3 className="pe-4">Points</h3>
        <h3 className="pe-4">0</h3>
        <h4 className="pe-4">
          <FaWindowClose /> Not Published
        </h4>
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
      {activeTab ? <EditDetails /> : <EditQuestions />}
      <div>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <input
              className="me-2"
              type="checkbox"
              value="NOTIFY-CHANGE"
              name="notify-change"
              id="notify-quiz-change"
            />
            <label htmlFor="notify-quiz-change">
              Notify users this quiz has changed
            </label>
          </div>
          <div>
            <button type="button" className="btn modules-buttons-styles">
              Cancel
            </button>
            <button type="button" className="btn modules-buttons-styles mx-3">
              Save & Publish
            </button>
            <button
              type="button"
              className="btn modules-module-button-style"
              onClick={() => dispatch(updateQuiz(quiz))}
            >
              Save
            </button>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default QuizzesEdit;
