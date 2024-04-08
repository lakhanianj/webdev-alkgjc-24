import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../Courses/Quizzes/reducer";

export interface KanbasState {
    quizReducer: {
        quizzes: any[];
        quiz: any;
    };
}
const store = configureStore({
    reducer: {
        quizReducer
    }
});


export default store;