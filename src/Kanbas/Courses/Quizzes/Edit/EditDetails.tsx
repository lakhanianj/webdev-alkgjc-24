import React, { useEffect, useState } from "react";
import {
  FaEllipsisV,
  FaKeyboard,
  FaCode,
  FaExpandAlt,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";
import { useParams } from "react-router";
import { findQuizById } from "../client";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../reducer";

export default function EditDetails() {
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const [showAnswers, setShowAnswers] = useState<boolean>(
    !!quiz.showCorrectAnswers
  );
  const [isPublished, setIsPublished] = useState(quiz.published);

  const { quizId } = useParams();

  const fetchQuiz = async () => {
    if (quizId !== "New") {
      findQuizById(quizId).then((quiz) => dispatch(setQuiz(quiz)));
    }
  };

  const handlePublishQuiz = async (quiz: any) => {
    dispatch(
      setQuiz({
        ...quiz,
        published: !quiz.published,
      })
    );
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="quiz-title">Title</label>
        <input
          id="quiz-title"
          className="form-control"
          defaultValue={quiz.name ?? `Unnamed Quiz`}
          onChange={(e) => dispatch(setQuiz({ ...quiz, name: e.target.value }))}
        />
      </div>
      <div className="pb-5">
        <p>Quiz Instructions:</p>
        <div className="ms-2">
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
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
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
              <div className="d-flex my-3">
                <div className="me-5">
                  <input
                    className="me-2"
                    type="checkbox"
                    value="SHOW-ANSWERS"
                    id="show-answers"
                    defaultChecked={quiz.showCorrectAnswers !== ""}
                    onChange={(e) => {
                      setShowAnswers(!showAnswers);
                      dispatch(
                        setQuiz({
                          ...quiz,
                          showCorrectAnswers: e.target.value
                            ? ""
                            : quiz.showCorrectAnswers,
                        })
                      );
                    }}
                  />
                  <label htmlFor="show-answers">Show Correct Answers</label>
                  <input
                    className="mx-1"
                    type="date"
                    id="set-show-answers"
                    name="show-answers"
                    defaultValue={quiz.showCorrectAnswers ?? ""}
                    onChange={(e) => {
                      if (showAnswers) {
                        dispatch(
                          setQuiz({
                            ...quiz,
                            showCorrectAnswers: e.target.value.toString(),
                          })
                        );
                      }
                    }}
                    placeholder="Insert date here"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="access-code">Access Code</label>
                <input
                  id="access-code"
                  type="text"
                  className="form-control"
                  defaultValue={quiz.accessCode}
                  onChange={(e) =>
                    dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))
                  }
                />
              </div>
              <div>
                <input
                  className="me-2"
                  type="checkbox"
                  value="ONE-AT-A-TIME"
                  name="one-at-a-time"
                  id="one-at-a-time"
                  defaultChecked={quiz.oneQuestionAtATime}
                  onChange={(e) =>
                    dispatch(
                      setQuiz({
                        ...quiz,
                        oneQuestionAtATime: !quiz.oneQuestionAtATime,
                      })
                    )
                  }
                />
                <label htmlFor="one-at-a-time">One Question at a Time</label>
              </div>
              <div>
                <input
                  className="me-2"
                  type="checkbox"
                  value="WEBCAM"
                  name="webcam"
                  id="webcam"
                  defaultChecked={quiz.webcamReq}
                  onChange={(e) =>
                    dispatch(setQuiz({ ...quiz, webcamReq: !quiz.webcamReq }))
                  }
                />
                <label htmlFor="webcam">Webcam Required</label>
              </div>
              <div>
                <input
                  className="me-2"
                  type="checkbox"
                  value="LOCK-QUESTIONS"
                  name="lock-questions"
                  id="lock-questions"
                  defaultChecked={quiz.lockAfterAnswering}
                  onChange={(e) =>
                    dispatch(
                      setQuiz({
                        ...quiz,
                        lockAfterAnswering: !quiz.lockAfterAnswering,
                      })
                    )
                  }
                />
                <label htmlFor="lock-questions">
                  Lock Questions After Answering
                </label>
              </div>
            </form>
            <button
              type="button"
              className="btn modules-publish-button-style"
              onClick={() => {
                handlePublishQuiz(quiz);
                setIsPublished(!isPublished);
              }}
            >
              {isPublished ? (
                <>
                  <FaBan className="fs-6 publish-icon" />
                  &nbsp; Click to Unpublish
                </>
              ) : (
                <>
                  <FaCheckCircle className="publish-icon fs-6 text-success" />
                  &nbsp; Click to Publish
                </>
              )}
            </button>
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
                    type="date"
                    className="form-control"
                    id="due-form"
                    defaultValue={quiz.dueDate}
                    placeholder="YYYY/MM/DD"
                    onChange={(e) =>
                      dispatch(
                        setQuiz({ ...quiz, dueDate: e.target.value.toString() })
                      )
                    }
                  />
                </div>
                <div className="d-flex mt-3">
                  <div>
                    <h6>Available from</h6>
                    <div className="input-group me-4">
                      <input
                        type="date"
                        className="form-control"
                        id="due-form"
                        placeholder="YYYY/MM/DD"
                        defaultValue={quiz.availableDate}
                        onChange={(e) =>
                          dispatch(
                            setQuiz({
                              ...quiz,
                              availableDate: e.target.value.toString(),
                            })
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <h6>Until</h6>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        defaultValue={quiz.untilDate}
                        placeholder="YYYY/MM/DD"
                        onChange={(e) =>
                          dispatch(
                            setQuiz({
                              ...quiz,
                              untilDate: e.target.value.toString(),
                            })
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
