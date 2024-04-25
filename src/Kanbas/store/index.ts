import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import quizReducer from "../Courses/Quizzes/reducer";
import questionReducer from "../Courses/Quizzes/Edit/QuestionTypes/reducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
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
    modulesReducer,
    quizReducer,
    questionReducer,
  }
});


export default store;