import React, { useEffect, useState } from "react";
import { FaCheck, FaEllipsisV, FaWindowClose } from "react-icons/fa";
import "./index.css";
import "../../../Courses/index.css";
import EditDetails from "./EditDetails";
import EditQuestions from "./EditQuestions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createQuiz, findQuizById, updateQuiz } from "../client";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, setQuiz, updateQuiz as updateQuizRedux } from "../reducer";
import { KanbasState } from "../../../store";
import {
  createQuestion,
  findQuestionsForQuiz,
  updateQuestion,
} from "./QuestionTypes/client";
import { setQuestions } from "./QuestionTypes/reducer";

function QuizzesEdit() {
  // Details tab is the default tab and is the active tab when activeTab is true.
  // When activeTab is false, Questions is the active tab
  const [activeTab, setActiveTab] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const questions = useSelector(
    (state: KanbasState) => state.questionReducer.questions
  );

  const fetchQuiz = async () => {
    if (quizId !== "New") {
      const quiz = await findQuizById(quizId);
      dispatch(setQuiz(quiz));
    }
  };

  const fetchQuestions = async () => {
    if (quizId !== "New") {
      const questions = await findQuestionsForQuiz(quizId ?? "");
      dispatch(setQuestions(questions));
    }
  };

  const handleSave = (publish: boolean, toDetails: boolean) => {
    let total: number = 0;
    const questionCount = questions.length;
    if (questionCount > 0) {
      questions.forEach((q: any) => {
        total += parseInt(q.pts);
      });
    }
    if (quizId === "New") {
      createQuiz({
        ...quiz,
        pts: total,
        numQuestions: questionCount,
        published: publish,
      }).then((newQuiz) => {
        dispatch(
          addQuiz({
            ...newQuiz,
            pts: total,
            numQuestions: questionCount,
            published: publish,
          })
        );
        dispatch(setQuiz(newQuiz));
        questions.forEach(async (q: any) => {
          if (q._id) {
            await updateQuestion({ ...q, quiz: newQuiz._id });
          } else {
            await createQuestion({ ...q, quiz: newQuiz._id });
          }
        });
        if (toDetails) {
          navigate(
            `/Kanbas/Courses/${courseId}/Quizzes/${newQuiz._id}/Details`
          );
        }
      });
    } else {
      updateQuiz({
        ...quiz,
        pts: total,
        numQuestions: questionCount,
        published: publish,
      }).then((newQuiz) => {
        dispatch(
          updateQuizRedux({
            ...quiz,
            pts: total,
            numQuestions: questionCount,
            published: publish,
          })
        );
        dispatch(setQuiz(quiz));
        questions.forEach(async (q: any) => {
          if (q._id) {
            await updateQuestion({ ...q, quiz: quiz._id });
          } else {
            await createQuestion({ ...q, quiz: quiz._id });
          }
        });
        if (toDetails) {
          navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`);
        }
      });
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchQuestions();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <h4 className="pe-2">Points: {quiz.pts} |</h4>
        <span className="pe-4">
          {quiz.published ? (
            <h4>
              <FaCheck className="text-success" /> Published |
            </h4>
          ) : (
            <h4>
              <FaWindowClose className="text-danger" /> Not Published |
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
      {activeTab ? <EditDetails /> : <EditQuestions />}

      {/* save/cancel buttons at the bottom */}
      <div>
        <hr />
        <div>
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
              <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}>
                <button type="button" className="btn modules-buttons-styles">
                  Cancel
                </button>
              </Link>
              <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}>
                <button
                  type="button"
                  className="btn modules-buttons-styles mx-3"
                  onClick={() => {
                    handleSave(true, false);
                  }}
                >
                  Save & Publish
                </button>
              </Link>

              <button
                type="button"
                className="btn modules-module-button-style"
                onClick={() => handleSave(quiz.published, true)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default QuizzesEdit;
