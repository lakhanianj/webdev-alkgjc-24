import React, { useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaFont,
  FaHighlighter,
  FaSuperscript,
  FaEllipsisV,
  FaKeyboard,
  FaCode,
  FaExpandAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { quizzes } from "../../../Database";

export default function EditDetails() {
  const { quizId } = useParams() ?? ("" as string);
  const initQuiz = quizzes.find((quiz) => quiz._id === quizId);

  const [quiz, setQuiz] = useState<any>(initQuiz);

  return (
    <div>
      <div className="mb-3">
        <input
          className="form-control"
          value={quiz.name ?? `Unnamed Quiz`}
          onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
        />
      </div>
      <div className="pb-5">
        <p>Quiz Instructions:</p>
        <div className="ms-2">
          <div className="d-flex">
            <button type="button" className="btn">
              Edit
            </button>
            <button type="button" className="btn">
              View
            </button>
            <button type="button" className="btn">
              Insert
            </button>
            <button type="button" className="btn">
              Format
            </button>
            <button type="button" className="btn">
              Tools
            </button>
            <button type="button" className="btn">
              Table
            </button>
          </div>
          <div className="d-flex">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                12pt
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Paragraph
              </button>
            </div>
            <p>|</p>
            <button type="button" className="btn">
              <FaBold />
            </button>
            <button type="button" className="btn">
              <FaItalic />
            </button>
            <button type="button" className="btn">
              <FaUnderline />
            </button>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaFont />
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaHighlighter />
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaSuperscript />
              </button>
            </div>
            <button type="button" className="btn">
              <FaEllipsisV />
            </button>
          </div>
          <textarea
            className="form-control wd-quiz-textarea"
            value={quiz.instructions ?? ""}
            onChange={(e) => {
              setQuiz({ ...quiz, instructions: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="d-flex">
          <p className="ms-3 me-auto">p</p>
          <div className="d-flex justify-content-around">
            <button type="button" className="btn wd-quiz-text-icons">
              <FaKeyboard />
            </button>
            <div className="d-flex mt-3">
              <p className="text-secondary">| </p>
              <p className="wd-quiz-text-icons">0 words</p>
              <p className="text-secondary">| </p>
            </div>
            <button type="button" className="btn wd-quiz-text-icons">
              <FaCode />
            </button>
            <button type="button" className="btn wd-quiz-text-icons">
              <FaExpandAlt />
            </button>
            <button type="button" className="btn wd-quiz-text-icons">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex dropdown ms-5">
              <label htmlFor="quiz-type">Quiz Type</label>
              <select
                id="quiz-type"
                className="dropdown-toggle modules-publish-button-style ms-3"
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option
                  selected={quiz.quizType === "graded-quiz"}
                  value="graded-quiz"
                >
                  Graded Quiz
                </option>
                <option
                  selected={quiz.quizType === "practice-quiz"}
                  value="practice-quiz"
                >
                  Practice Quiz
                </option>
                <option
                  selected={quiz.quizType === "graded-survey"}
                  value="graded-survey"
                >
                  Graded Survey
                </option>
                <option
                  selected={quiz.quizType === "ungraded-survey"}
                  value="ungraded-survey"
                >
                  Ungraded Survey
                </option>
              </select>
            </div>
          </div>
          <div className="d-flex dropdown mt-3">
            <label htmlFor="assignment-group">Assignment Group</label>
            <select
              id="assignment-group"
              className="dropdown-toggle modules-publish-button-style ms-3"
              onChange={(e) =>
                setQuiz({ ...quiz, assignmentType: e.target.value })
              }
            >
              <option
                selected={quiz.assignmentType === "quizzes"}
                value="quizzes"
              >
                Quizzes
              </option>
              <option selected={quiz.assignmentType === "exams"} value="exams">
                Exams
              </option>
              <option
                selected={quiz.assignmentType === "assignments"}
                value="assignments"
              >
                Assignments
              </option>
              <option
                selected={quiz.assignmentType === "project"}
                value="project"
              >
                Project
              </option>
            </select>
          </div>
          <div>
            <p className="wd-quiz-options">Options</p>
            <form id="quiz-options">
              <div>
                <input
                  className="me-2"
                  type="checkbox"
                  value="SHUFFLE-ANSWERS"
                  name="shuffle-answers"
                  id="shuffle-ans"
                  defaultChecked={quiz.shuffled}
                  onChange={(e) =>
                    setQuiz({ ...quiz, shuffled: e.target.value })
                  }
                />
                <label htmlFor="shuffle-ans">Shuffle Answers</label>
              </div>
              <div className="d-flex my-3">
                <div className="me-5">
                  <input
                    className="me-2"
                    type="checkbox"
                    value="TIME-LIMIT"
                    name="time-limit"
                    id="time-limit"
                    defaultChecked={quiz.timeLimit !== 0}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        timeLimit: e.target.value ? quiz.timeLimit : 0,
                      })
                    }
                  />
                  <label htmlFor="time-limit">Time Limit</label>
                </div>
                <div>
                  <input
                    className="w-25 me-2"
                    type="number"
                    id="time-limit-min"
                    defaultValue={quiz.timeLimit}
                    onChange={(e) =>
                      setQuiz({ ...quiz, timeLimit: e.target.value })
                    }
                  />
                  <label htmlFor="time-limit-min">Minutes</label>
                </div>
              </div>
              <div className="border rounded mt-2">
                <input
                  className="m-3"
                  type="checkbox"
                  value="MULTI-ATTEMPT"
                  name="multi-attempt"
                  id="multi-attempt"
                  defaultValue={quiz.multipleAttempts}
                  onChange={(e) =>
                    setQuiz({ ...quiz, multipleAttempts: e.target.value })
                  }
                />
                <label htmlFor="multi-attempt">Allow Multiple Attempts</label>
              </div>
            </form>
          </div>
          <div className="d-flex m-5">
            <p className="me-5">Assign</p>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Assign to</h5>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  placeholder="Everyone"
                />
                <h6 className="mt-3">Due</h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="due-form"
                    defaultValue={quiz.dueDate}
                    onChange={(e) =>
                      setQuiz({ ...quiz, dueDate: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex mt-3">
                  <div>
                    <h6>Available from</h6>
                    <div className="input-group me-4">
                      <input
                        type="text"
                        className="form-control"
                        id="due-form"
                        defaultValue={quiz.availableDate}
                        onChange={(e) =>
                          setQuiz({ ...quiz, availableDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <h6>Until</h6>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={quiz.untilDate}
                        onChange={(e) =>
                          setQuiz({ ...quiz, untilDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-3">
                  <button type="button" className="btn modules-buttons-styles">
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <button type="button" className="btn modules-module-button-style">
              Save
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
