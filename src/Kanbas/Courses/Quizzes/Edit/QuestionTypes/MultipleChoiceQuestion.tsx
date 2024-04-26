import React from "react";
import {
  FaTrash,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { addAnswer, deleteAnswer, setAnswer, setQuestion } from "./reducer";

export default function MultipleChoiceQuestion() {
  // correct answer for multiple choice question is id of the answer

  const dispatch = useDispatch();

  const question = useSelector(
    (state: KanbasState) => state.questionReducer.question
  );
  
  return (
    <div>
      <div>
        <br />
        <h6>
          Enter your question and multiple answers, then select the one correct
          answer.
        </h6>
        <h5>Question:</h5>
        {/* Buttons for editing, viewing, etc. */}
        <textarea
          className="form-control wd-quiz-textarea"
          defaultValue={question.question}
          onChange={(e) =>
            dispatch(setQuestion({ ...question, question: e.target.value }))
          }
        ></textarea>

        <br />
        <h5>Answers:</h5>
        {question.answers?.map((choice: any, index: number) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <label className="mx-1" htmlFor={index.toString()}>
              Correct choice? &nbsp; 
            </label>
            <input
              type="radio"
              name="correctAnswer"
              checked={choice._id === question.correctAnswer}
              onClick={() =>
                dispatch(
                  setQuestion({ ...question, correctAnswer: choice._id })
                )
              }
              id={index.toString()}
            />
            <textarea
              id={index.toString()}
              className="mx-1"
              value={choice.value}
              onChange={(e) => {
                dispatch(setAnswer({ _id: choice._id, value: e.target.value }));
                if (choice._id === question.correctAnswer) {
                  dispatch(
                    setQuestion({ ...question, correctAnswer: e.target.value })
                  );
                }
              }}
              placeholder="Insert choice here"
            />
            <button
              type="button"
              className="btn"
              onClick={() => dispatch(deleteAnswer(choice._id))}
            >
              <FaTrash></FaTrash>
            </button>
          </div>
        ))}
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
      <br/>
    </div>
  );
}