import React from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./index.css";
import "../../../Courses/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SetStateAction, useEffect, useState } from "react";
import MultipleChoiceQuestion from "./QuestionTypes/MultipleChoiceQuestion";
import TrueFalseQuestion from "./QuestionTypes/TrueFalseQuestion";
import FillBlanksQuestion from "./QuestionTypes/FillBlanksQuestion";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import {
  addQuestion,
  removeQuestion,
  setQuestion,
  setQuestions,
  updateQuestion,
} from "./QuestionTypes/reducer";
import {
  deleteQuestion,
  findQuestionById,
  findQuestionsForQuiz,
} from "./QuestionTypes/client";

export default function EditQuestions() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const [questionEditor, setQuestionEditor] = useState(false);
  const [selectedType, setSelectedType] = useState("mc"); // Default value for dropdown

  const questions = useSelector(
    (state: KanbasState) => state.questionReducer.questions
  );

  const question = useSelector(
    (state: KanbasState) => state.questionReducer.question
  );

  const fetchQuestion = async () => {
    if (quizId !== "New") {
      const fetchedQuestion = await findQuestionById(question._id);
      dispatch(setQuestion(fetchedQuestion));
    }
  };

  const fetchQuestions = async () => {
    if (quizId !== "New") {
      const questions = await findQuestionsForQuiz(quizId ?? "");
      dispatch(setQuestions(questions));
    }
  };

  const handleTypeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedType(event.target.value);
    dispatch(setQuestion({ ...question, type: event.target.value }));
  };

  const handleEditQuestion = (question: any) => {
    setSelectedType(question.type);
    dispatch(setQuestion(question));
    setQuestionEditor(true);
  };

  const handleSave = () => {
    if (question._id) {
      dispatch(updateQuestion(question));
    } else {
      dispatch(addQuestion(question));
    }
  };

  const handleDeleteQuestion = (qid: string) => {
    deleteQuestion(qid).then((status) => {
      dispatch(removeQuestion(qid));
    });
  };

  useEffect(() => {
    fetchQuestions();
    if (questionEditor) {
      fetchQuestion();
    }
  }, []);

  // const questions = questionsAll.filter(
  //   (question: any) => question.quiz === quizId
  // );

  return (
    <div>
      <div className="d-flex justify-content-center align-items-end">
        <button
          onClick={() => {
            handleEditQuestion({
              title: "Untitled Question",
              course: courseId,
              type: "mc",
              pts: 0,
              question: "",
              answers: [],
              correctAnswer: "-",
            });
          }}
          type="button"
          className="mx-4 btn modules-publish-button-style"
        >
          <FaPlus></FaPlus> New Question
        </button>

        <button type="button" className="mx-4 btn modules-publish-button-style">
          <FaPlus></FaPlus> New Question Group
        </button>

        <button type="button" className="mx-4 btn modules-publish-button-style">
          <FaSearch></FaSearch> Find Questions
        </button>
      </div>

      {questionEditor ? (
        <div>
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <input
                type="text"
                placeholder="Question Title"
                id="question-title"
                defaultValue={question.title}
                onChange={(e) =>
                  dispatch(setQuestion({ ...question, title: e.target.value }))
                }
              />
              <select
                id="question-type"
                className="dropdown-toggle modules-publish-button-style ms-3"
                onChange={handleTypeChange}
                value={selectedType}
              >
                <option value="mc">Multiple Choice</option>
                <option value="tf">True or False</option>
                <option value="fb">Fill in the Blanks</option>
              </select>
            </div>
            <div>
              <label htmlFor="pts">pts:</label>
              <input
                type="text"
                id="pts"
                defaultValue={question.pts}
                onChange={(e) =>
                  dispatch(setQuestion({ ...question, pts: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            {selectedType === "mc" && <MultipleChoiceQuestion />}
            {selectedType === "tf" && <TrueFalseQuestion />}
            {selectedType === "fb" && <FillBlanksQuestion />}
          </div>
          <div>
            <button
              className="btn modules-buttons-styles me-3"
              onClick={() => setQuestionEditor(false)}
            >
              Cancel
            </button>
            <button
              className="btn modules-module-button-style"
              onClick={() => {
                handleSave();
                setQuestionEditor(false);
              }}
            >
              Save Question
            </button>
          </div>
        </div>
      ) : (
        <div>
          <br />
          <div className="question-box">
            {/* Display list of questions here */}
            {questions.map((question, index) => (
              <div key={index} className="question">
                <span className="fw-bold">Question "{question.title}": </span>
                <span>{question.question}</span>
                <span className="float-end">
                  <FaEdit
                    onClick={() => {
                      handleEditQuestion(question);
                    }}
                    className="bigger text-success"
                  ></FaEdit>
                  <FaTrash
                    className="bigger text-danger"
                    onClick={() => handleDeleteQuestion(question._id)}
                  ></FaTrash>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
