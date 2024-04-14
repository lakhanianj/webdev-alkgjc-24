import { FaEdit, FaEllipsisV, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";
import "../../../Courses/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SetStateAction, useState } from "react";
import MultipleChoiceQuestion from "./QuestionTypes/MultipleChoiceQuestion";
import TrueFalseQuestion from "./QuestionTypes/TrueFalseQuestion";
import FillBlanksQuestion from "./QuestionTypes/FillBlanksQuestion";
import { quizQuestions } from "../../../Database/index"
export default function EditQuestions() {
    const [questionEditor, setQuestionEditor] = useState(false);
    const [selectedType, setSelectedType] = useState("mc"); // Default value for dropdown
    const [questions, setQuizQuestions] = useState(quizQuestions)

    const toggleQuestionEditor = () => {
        setQuestionEditor(!questionEditor);
    }

    const handleTypeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedType(event.target.value);
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-end">
                <button onClick={toggleQuestionEditor} type="button" className="mx-4 btn modules-publish-button-style">
                    <FaPlus></FaPlus> New Question
                </button>

                <button type="button" className="mx-4 btn modules-publish-button-style">
                    <FaPlus></FaPlus> New Question Group
                </button>

                <button type="button" className="mx-4 btn modules-publish-button-style">
                    <FaSearch></FaSearch> Find Questions
                </button>
            </div>

            {!questionEditor && (
                <div>
                    <br />

                    <div className="question-box">
                        {/* Display list of questions here */}
                        {questions.map((question, index) => (
                            <div key={index} className="question">
                                <span className="fw-bold">Question {question._id}: </span>
                                <span>{question.question}</span>
                                <span className="float-end">
                                    <FaEdit className="bigger text-success"></FaEdit>
                                    <FaTrash className="bigger text-danger"></FaTrash>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            )}

            {questionEditor && (
                <div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div>
                            <input type="text" placeholder="Question Title" id="question-title" />
                            <select id="question-type" className="dropdown-toggle modules-publish-button-style ms-3" onChange={handleTypeChange} value={selectedType}>
                                <option value="mc">Multiple Choice</option>
                                <option value="tf">True or False</option>
                                <option value="fb">Fill in the Blanks</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pts">pts:</label>
                            <input type="text" id="pts" />
                        </div>
                    </div>
                    {selectedType === "mc" && <MultipleChoiceQuestion />}
                    {selectedType === "tf" && <TrueFalseQuestion />}
                    {selectedType === "fb" && <FillBlanksQuestion />}
                </div>
            )}
        </div>
    );
}
