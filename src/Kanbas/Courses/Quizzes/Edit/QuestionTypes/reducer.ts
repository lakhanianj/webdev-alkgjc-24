import { createSlice } from "@reduxjs/toolkit";
import { quizQuestions } from "../../../../Database";

const initialState = {
    questions: quizQuestions,
    question: {
        title: "",
        course: "",
        quiz: "",
        type: "mc",
        pts: 0,
        question: "",
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
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions = [...state.questions, action.payload];
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (question) => question._id !== action.payload
            );
        },
        setAnswer: (state, action) => {
            if (state.question.type !== "tf") {
                state.question.answers = state.question.answers?.map((answer) => {
                    if (answer._id === action.payload._id) {
                        return { _id: answer._id, value: action.payload.value };
                    } else {
                        return answer;
                    }
                });
            }
        },
        addAnswer: (state) => {
            if (state.question.type !== "tf") {
                state.question.answers = [...state.question.answers, { _id: new Date().getTime().toString(), value: "" }];
            }
        },
        deleteAnswer: (state, action) => {
            if (state.question.type !== "tf") {
                state.question.answers = state.question.answers?.filter((answer) => answer._id !== action.payload);
            }
        }
    }
});


export const { updateQuestion, setQuestion, addQuestion, removeQuestion, setAnswer, addAnswer, deleteAnswer, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;