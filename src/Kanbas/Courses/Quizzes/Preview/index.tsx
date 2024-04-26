import React, { useEffect, useState } from "react";
import "./index.css";
import {
  FaExclamationCircle,
  FaPencilAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { findQuizById } from "../client";
import { setQuiz } from "../reducer";
import { findQuestionsForQuiz } from "../Edit/QuestionTypes/client";
import { setQuestions } from "../Edit/QuestionTypes/reducer";


function QuizPreview() {
  const [date] = useState(new Date());


  const { courseId, quizId } = useParams();


  const path = useLocation();
  const dispatch = useDispatch();

  const quiz = useSelector(
    (state: KanbasState) => state.quizReducer.quiz
  );

  const fetchQuiz = async () => {
    const quiz = await findQuizById(quizId);
    dispatch(setQuiz(quiz));
  };

  const questions = useSelector(
    (state: KanbasState) => state.questionReducer.questions
  );

  const fetchQuestions = async () => {
    if (quizId !== "New") {
      const questions = await findQuestionsForQuiz(quizId ?? "");
      dispatch(setQuestions(questions));
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchQuestions();
  }, []);

  const questionCount = questions.length;

  if (questionCount === 0) {
    return (
      <div className="p-4 dashboard-height-margin">
        <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">
          {quiz.name}
        </h1>
        <div className="imp-note">
          <FaExclamationCircle className="fa fa-exclamation-circle" /> This is a
          preview of the published version of the quiz
        </div>
        <br />
        <h2> No Questions to Preview </h2>
      </div>
    )
  }
  else {
    return (
      <div className="p-4 dashboard-height-margin">
        <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">
          {quiz.name}
        </h1>
        <div className="imp-note">
          <FaExclamationCircle className="fa fa-exclamation-circle" /> This is a
          preview of the published version of the quiz
        </div>
        <div className="margin-bottom-15"></div>
        <div>
          Started: {date.toDateString()} at {date.toLocaleTimeString()}
        </div>
        <div className="margin-bottom-8"></div>
        <h2>Quiz Instructions</h2>
        <hr className=""></hr>


        <ul className="list-group wd-quizzes col-sm-10">
        {questions.map((question, index) => (
          <li className="list-group-item">
            <div className="list-group-header-style">
              <span className="list-group-title-style">
                &nbsp; Question {index + 1}
              </span>
              <span className="float-end">{question.pts} pts</span>
            </div>


            <ul className="list-group">
              <li className="list-group-item top-bottom-padding-10">
                {" "}
                <> {question.question} </>
              </li>
            </ul>


            {question.type === "mc" && (
              <ul className="list-group">
                {question.answers.map(
                  (answer: {
                    value:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  }) => (
                    <li className="list-group-item">
                      <label>
                        <input type="radio" name="MC" />
                        &nbsp; {answer.value}
                      </label>
                    </li>
                  )
                )}
              </ul>
            )}


            {question.type === "tf" && (
              <ul className="list-group">
                <li className="list-group-item">
                  <label>
                    <input type="radio" name="TF" />
                    &nbsp; True
                  </label>
                </li>
                <li className="list-group-item">
                  <label>
                    <input type="radio" name="TF" />
                    &nbsp; False
                  </label>
                </li>
              </ul>
  )}


            {question.type === "fb" && (
              <ul className="list-group">
                {question.answers.map(
                  (answer: {
                    value:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  }) => (
                    <li className="list-group-item">
                      <textarea
                        className="fb-box-style"
                        name="FB"
                      ></textarea>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
               ))}
        </ul>

        <br />
        <br />
        <div className="submit-box">
          <div className="float-right">
            <span>
              Quiz saved at {new Date().toLocaleTimeString()}
              &nbsp; &nbsp;
              <button
                type="button"
                className="btn modules-buttons-styles float-right"
              >
                Submit Quiz
              </button>
            </span>
          </div>
        </div>


        <br />
        <br />
        <br />
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`}
          className="btn modules-publish-button-style preview-edit-button"
        >
          {<FaPencilAlt className="fa fa-question-circle fs-6" />}
          Keep Editing This Quiz
        </Link>


        <br />
        <br />
        <h4>Questions</h4>


        {questions.map((question, index) => (
          <>
            <span>
              {" "}
              &nbsp; &nbsp;{" "}
              <FaQuestionCircle
                style={{ color: "gray" }}
                className="fa fa-question-circle fs-6"
              />
              &nbsp;
            </span>{" "}
            <span className="link-icon-style">
              {" "}
              Question {index + 1}
            </span>
            <br />
          </>
        ))}
      </div>
    );
  }
}


export default QuizPreview;


