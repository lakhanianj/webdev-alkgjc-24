import React from "react";
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
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, deleteAnswer, setAnswer, setQuestion } from "./reducer";
import "../../../../Courses/index.css";
import { KanbasState } from "../../../../store";

export default function FillBlanksQuestion() {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: KanbasState) => state.questionReducer.question
  );

  return (
    <>
      <div className="mt-3">
        <h6>
          Enter your question text, then define all possible correct answers for
          the blank.
        </h6>
        <h6>
          Students will see the question followed by a small text box to type
          their answer.
        </h6>
        <h5>Question:</h5>
        <div className="pb-5">
          <p>Quiz Instructions:</p>
          <div className="ms-2">
            <textarea
              className="form-control wd-quiz-textarea"
              defaultValue={question?.question ?? ""}
              onChange={(e) => {
                dispatch(
                  setQuestion({ ...question, question: e.target.value })
                );
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
        <div>
          <h5>Answers:</h5>
          <ul>
            {question.answers?.map((answer: any, index: number) => (
              <li key={index}>
                <div className="d-flex mb-3">
                  <p>Possible Answer:</p>
                  <input
                    className="form-control ms-2"
                    value={answer.value}
                    onChange={(e) =>
                      dispatch(
                        setAnswer({ _id: answer._id, value: e.target.value })
                      )
                    }
                  />
                  <FaTrash
                    className="bigger text-danger ms-3"
                    onClick={() => {
                      dispatch(deleteAnswer(answer._id));
                    }}
                  ></FaTrash>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              dispatch(addAnswer());
            }}
            className="btn btn-link link-icon-style float-end"
          >
            + Add Another Answer
          </button>
        </div>
      </div>
    </>
  );
}