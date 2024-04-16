import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../Courses/Quizzes/reducer";
import questionReducer from "../Courses/Quizzes/Edit/QuestionTypes/reducer";

export interface KanbasState {
    quizReducer: {
        quizzes: any[];
        quiz: any;
    };
    questionReducer: {
        questions: any[];
        question: any;
    };
}
const store = configureStore({
    reducer: {
        quizReducer,
        questionReducer,
    }
});


export default store;