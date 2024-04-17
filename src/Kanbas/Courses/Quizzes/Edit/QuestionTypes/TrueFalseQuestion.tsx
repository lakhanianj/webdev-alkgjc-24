import { ChangeEvent, useState } from "react";
import {
  FaBold,
  FaEllipsisV,
  FaFont,
  FaHighlighter,
  FaItalic,
  FaSuperscript,
  FaTrash,
  FaUnderline,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuestion } from "./reducer";

export default function TrueFalseQuestion() {
  // const [choices, setChoices] = useState([{ isCorrect: false }]);
  const dispatch = useDispatch();

  const question = useSelector(
    (state: KanbasState) => state.questionReducer.question
  );

  // const handleCorrectChoiceChange = (index: number) => {
  //     const newChoices = [...choices];
  //     newChoices.forEach((choice, i) => {
  //         newChoices[i].isCorrect = i === index;
  //     });
  //     setChoices(newChoices);
  // };

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
        {/* {question.choices.map((choice, index) => ( */}
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
              <label htmlFor="True">True</label>
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
              <label htmlFor="False">False</label>
            </div>
          </fieldset>
        </div>
        {/* ))} */}
      </div>
      {/* <br />
      <button className="btn btn-warning">Cancel</button>
      <button className="mx-2 btn btn-danger">Update Question</button> */}
    </div>
  );
}
