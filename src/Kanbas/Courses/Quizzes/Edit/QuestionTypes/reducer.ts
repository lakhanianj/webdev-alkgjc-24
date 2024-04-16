import { createSlice } from "@reduxjs/toolkit";
import { quizQuestions } from "../../../../Database";

const initialState = {
    questions: quizQuestions,
    question: {
        _id: "",
        title: "",
        course: "",
        quiz: "",
        type: "mc",
        pts: 0,
        question: "",
        choices: [{ _id: "", value: "" }],
        answers: [{ _id: "", value: "" }],
        correctAnswer: "-"
    },
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((question: any) => {
                if (question._id === action.payload._id) {
                    return action.payload;
                } else {
                    return question;
                }
            });
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions = [
                ...state.questions,
                { ...action.payload, _id: new Date().getTime().toString() },
            ];
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (question) => question._id !== action.payload
            );
        },
        setAnswer: (state, action) => {
            switch (state.question.type) {
                case "mc":
                    state.question.choices = state.question.choices.map((choice) => {
                        if (choice._id === action.payload._id) {
                            return { _id: choice._id, value: action.payload.value };
                        } else {
                            return choice;
                        }
                    });
                    break;
                case "fb":
                    state.question.answers = state.question.answers.map((answer) => {
                        if (answer._id === action.payload._id) {
                            return { _id: answer._id, value: action.payload.value };
                        } else {
                            return answer;
                        }
                    });
                    break;
                case "tf":
                default:
                    break;
            }
        },
        addAnswer: (state) => {
            switch (state.question.type) {
                case "mc":
                    state.question.choices = [...state.question.choices,
                    { _id: new Date().getTime().toString(), value: "" }];
                    break;
                case "fb":
                    state.question.answers = [...state.question.answers, { _id: new Date().getTime().toString(), value: "" }];
                    break;
                case "tf":
                    break;
                default:
                    break;
            }
        },
        deleteAnswer: (state, action) => {
            switch (state.question.type) {
                case "mc":
                    state.question.choices = state.question.choices.filter((choice) => choice._id !== action.payload);
                    break;
                case "fb":
                    state.question.answers = state.question.answers.filter((answer) => answer._id !== action.payload);
                    break;
                case "tf":
                    break;
                default:
                    break;
            }
        }
    }
});


export const { updateQuestion, setQuestion, addQuestion, removeQuestion, setAnswer, addAnswer, deleteAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;