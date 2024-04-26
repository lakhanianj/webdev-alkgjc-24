import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestion } from "./reducer";

export default function TrueFalseQuestion() {
  const dispatch = useDispatch();

  const question = useSelector(
    (state: KanbasState) => state.questionReducer.question
  );

  return (
    <div>
      <div>
        <br />
        <h6>
          Enter your question text, then select if true or false is the correct
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
        <div key={0} className="d-flex align-items-center mb-2">
          <fieldset>
            <div>
              <input
                type="radio"
                id="True"
                value="true"
                name="T/F"
                onClick={() => {
                  dispatch(setQuestion({ ...question, correctAnswer: true }));
                }}
                defaultChecked={question.correctAnswer}
              />
              <label htmlFor="True">&nbsp; True</label>
            </div>
            <div>
              <input
                type="radio"
                id="False"
                value="false"
                name="T/F"
                onClick={() => {
                  dispatch(setQuestion({ ...question, correctAnswer: false }));
                }}
                defaultChecked={!question.correctAnswer}
              />
              <label htmlFor="False">&nbsp; False</label>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}