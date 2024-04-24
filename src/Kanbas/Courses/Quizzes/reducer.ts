import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

const initialState = {
    quizzes: quizzes,
    quiz: {
        course: "",
        name: "Unnamed Quiz",
        dueDate: "",
        availableDate: "",
        pts: 0,
        numQuestions: 0,
        published: false,
        description: "",
        shuffled: true,
        quizType: "graded-quiz",
        assignmentType: "quizzes",
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamReq: false,
        lockAfterAnswering: false,
        untilDate: ""
    },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
                if (quiz._id === action.payload._id) {
                    return action.payload;
                } else {
                    return quiz;
                }
            });
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes = [...state.quizzes, action.payload];
        },
        removeQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz._id !== action.payload
            );
        }
    }
});


export const { updateQuiz, setQuiz, addQuiz, removeQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;