import { ChangeEvent, useState } from 'react';
import { FaBold, FaEllipsisV, FaFont, FaHighlighter, FaItalic, FaSuperscript, FaTrash, FaUnderline } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MultipleChoiceQuestion() {
    const [choices, setChoices] = useState([{ text: '', isCorrect: false }]);

    const addChoice = () => {
        setChoices([...choices, { text: '', isCorrect: false }]);
    };

    const deleteChoice = (index: number) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setChoices(newChoices);
    }

    const handleChoiceTextChange = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
        const newChoices = [...choices];
        newChoices[index].text = event.target.value;
        setChoices(newChoices);
    };

    const handleCorrectChoiceChange = (index: number) => {
        const newChoices = [...choices];
        newChoices.forEach((choice, i) => {
            newChoices[i].isCorrect = i === index;
        });
        setChoices(newChoices);
    };

    return (
        <div>
            <div>
                <br />
                <h6>Enter your question and multiple answers, then select the one correct answer.</h6>
                <h5>Question:</h5>
                {/* Buttons for editing, viewing, etc. */}
                <textarea
                    className="form-control wd-quiz-textarea"
                ></textarea>

                <br />
                <h5>Answers:</h5>
                {choices.map((choice, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <label className="mx-1" htmlFor={index.toString()}>Correct choice?</label>
                        <input
                            type="radio"
                            checked={choice.isCorrect}
                            onChange={() => handleCorrectChoiceChange(index)}
                            id={index.toString()}

                        />
                        <textarea
                            className='mx-1'
                            value={choice.text}
                            onChange={(event) => handleChoiceTextChange(index, event)}
                            placeholder="Insert choice here"
                        />
                        <button type="button" onClick={() => deleteChoice(index)}>
                            <FaTrash></FaTrash>
                        </button>
                    </div>
                ))}
                <button type="button" className="btn btn-danger" onClick={addChoice}>
                    Add Choice
                </button>
            </div>
            <br/>
            <button className='btn btn-warning'>Cancel</button>
            <button className='mx-2 btn btn-danger'>Update Question</button>
        </div>
    );
}
