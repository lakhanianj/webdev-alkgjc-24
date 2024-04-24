import React, { useEffect } from "react";
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
import { useParams } from "react-router";
import { findQuizById } from "../client";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../reducer";

export default function EditDetails() {
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

  const { quizId } = useParams();

  const fetchQuiz = async () => {
    if (quizId !== "New") {
      findQuizById(quizId).then((quiz) => dispatch(setQuiz(quiz)));
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div>
      <div className="mb-3">
        <input
          className="form-control"
          defaultValue={quiz.name ?? `Unnamed Quiz`}
          onChange={(e) => dispatch(setQuiz({ ...quiz, name: e.target.value }))}
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
            defaultValue={quiz.instructions ?? ""}
            onChange={(e) => {
              dispatch(setQuiz({ ...quiz, instructions: e.target.value }));
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
                onChange={(e) =>
                  dispatch(setQuiz({ ...quiz, quizType: e.target.value }))
                }
                defaultValue={quiz.quizType}
              >
                <option value="graded-quiz">Graded Quiz</option>
                <option value="practice-quiz">Practice Quiz</option>
                <option value="graded-survey">Graded Survey</option>
                <option value="ungraded-survey">Ungraded Survey</option>
              </select>
            </div>
          </div>
          <div className="d-flex dropdown mt-3">
            <label htmlFor="assignment-group">Assignment Group</label>
            <select
              id="assignment-group"
              className="dropdown-toggle modules-publish-button-style ms-3"
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, assignmentType: e.target.value }))
              }
              defaultValue={quiz.assignmentType}
            >
              <option value="quizzes">Quizzes</option>
              <option value="exams">Exams</option>
              <option value="assignments">Assignments</option>
              <option value="project">Project</option>
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
                    dispatch(setQuiz({ ...quiz, shuffled: !quiz.shuffled }))
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
                    defaultChecked={quiz.timeLimit > 0}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          timeLimit: e.target.value ? 0 : quiz.timeLimit,
                        })
                      )
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
                      dispatch(
                        setQuiz({
                          ...quiz,
                          timeLimit: parseInt(e.target.value),
                        })
                      )
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
                  defaultChecked={quiz.multipleAttempts}
                  onChange={(e) =>
                    dispatch(
                      setQuiz({
                        ...quiz,
                        multipleAttempts: !quiz.multipleAttempts,
                      })
                    )
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
                      dispatch(setQuiz({ ...quiz, dueDate: e.target.value }))
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
                          dispatch(
                            setQuiz({ ...quiz, availableDate: e.target.value })
                          )
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
                          dispatch(
                            setQuiz({ ...quiz, untilDate: e.target.value })
                          )
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
    </div>
  );
}
