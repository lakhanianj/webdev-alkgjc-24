import { ChangeEvent, useState } from 'react';
import { FaBold, FaEllipsisV, FaFont, FaHighlighter, FaItalic, FaSuperscript, FaTrash, FaUnderline } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TrueFalseQuestion() {
    const [choices, setChoices] = useState([{ isCorrect: false }]);

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
                <h6>Enter your question text, then select if true or false is the correct answer.</h6>
                <h5>Question:</h5>
                {/* Buttons for editing, viewing, etc. */}
                <textarea
                    className="form-control wd-quiz-textarea"
                ></textarea>

                <br />
                <h5>Answers:</h5>
                {choices.map((choice, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <fieldset>
                            <div>
                                <input type="radio" id="True" value="True" name="T/F" onChange={() => handleCorrectChoiceChange(index)} checked={choice.isCorrect} />
                                <label htmlFor="True">True</label>
                            </div>
                            <div>
                                <input type="radio" id="False" value="False" name="T/F" />
                                <label htmlFor="False">False</label>
                            </div>
                        </fieldset>
                    </div>
                ))}

            </div>
            <br />
            <button className='btn btn-warning'>Cancel</button>
            <button className='mx-2 btn btn-danger'>Update Question</button>
        </div>
    );
}
