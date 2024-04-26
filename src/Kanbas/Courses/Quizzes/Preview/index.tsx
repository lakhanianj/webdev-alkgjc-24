import React, { useEffect, useState } from "react";
import "./index.css";
import {
 FaCaretLeft,
 FaCaretRight,
 FaExclamationCircle,
 FaPencilAlt,
 FaQuestionCircle,
} from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { findQuizById } from "../client";
import { setQuiz } from "../reducer";
import { findQuestionsForQuiz } from "../Edit/QuestionTypes/client";
import { setQuestions } from "../Edit/QuestionTypes/reducer";


function QuizPreview() {
 const [date] = useState(new Date());


 const { courseId, quizId } = useParams();


 const path = useLocation();
 const pathSplit = path.pathname.split("/");
 // const lastPathItem = decodeURI(pathSplit[pathSplit.length - 1]);
 // const secondLastPathItem = decodeURI(pathSplit[pathSplit.length - 2]);


 const dispatch = useDispatch();


 const quiz = useSelector(
   (state: KanbasState) => state.quizReducer.quiz
 );


 const fetchQuiz = async () => {
   const quiz = await findQuizById(quizId);
   dispatch(setQuiz(quiz));
 };


 // useEffect(() => {
 //   fetchQuiz();
 // }, []);


 console.log("QUIZ")
 console.log(quiz);


 // const quizList = quizzes.filter(
 //   (quiz) => quiz.course === courseId && quiz._id === quizId
 // );


 // const quiz = quizList[0];


 const questions = useSelector(
   (state: KanbasState) => state.questionReducer.questions
 );


 // const questionList = questionsAll.filter(
 //   (question) => question.course === courseId && question.quiz === quiz._id
 // );


 const fetchQuestions = async () => {
   if (quizId !== "New") {
     const questions = await findQuestionsForQuiz(quizId ?? "");
     dispatch(setQuestions(questions));
     console.log("QUESTIONS");
     console.log(questions);
   }
 };


 useEffect(() => {
   fetchQuiz();
   fetchQuestions();
 }, []);




 const questionCount = questions.length;


 // console.log(questionCount);




 // let questionNumber = 0
 const [questionNumber, setQuestionNumber] = useState(0);


 const [currentQuestion, setCurrentQuestion] = useState(
   questions[questionNumber]
 );


 function handleNext() {
   if (questionNumber < questionCount - 1) {
     setQuestionNumber(questionNumber + 1);
     setCurrentQuestion(questions[questionNumber]);
   } else {
     setQuestionNumber(questionCount - 1);
     setCurrentQuestion(questions[questionNumber]);
   }
 }


 function handleBack() {
   if (questionNumber > 0) {
     setQuestionNumber(questionNumber - 1);
     setCurrentQuestion(questions[questionNumber]);
   } else {
     setQuestionNumber(0);
     setCurrentQuestion(questions[questionNumber]);
   }
 }


 function handleQuestionClick(index: any) {
   setQuestionNumber(index);
   setCurrentQuestion(questions[questionNumber]);
 }


 // console.log(questions)


 if (questionCount === 0) {
   return (
     <div className="p-4 dashboard-height-margin">
     <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">
       {quiz.name}
     </h1>
     <div className="imp-note">
       <FaExclamationCircle className="fa fa-exclamation-circle" /> This is a
       preview of the published version of the quiz
     </div>
     <br/>
     <h2> No Questions to Preview </h2>
     </div>
   )
 }
 else {


 return (
   <div className="p-4 dashboard-height-margin">
     <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">
       {quiz.name}
     </h1>
     <div className="imp-note">
       <FaExclamationCircle className="fa fa-exclamation-circle" /> This is a
       preview of the published version of the quiz
     </div>
     <div className="margin-bottom-15"></div>
     <div>
       Started: {date.toDateString()} at {date.toLocaleTimeString()}
     </div>
     <div className="margin-bottom-8"></div>
     <h2>Quiz Instructions</h2>
     <hr className=""></hr>


     <ul className="list-group wd-quizzes col-sm-10">
       <li className="list-group-item">
         <div className="list-group-header-style">
           <span className="list-group-title-style">
             &nbsp; Question {questionNumber + 1}
           </span>
           <span className="float-end">{currentQuestion.pts} pts</span>
         </div>


         <ul className="list-group">
           <li className="list-group-item top-bottom-padding-10">
             {" "}
             <> {currentQuestion.question} </>
           </li>
         </ul>


         {currentQuestion.type === "mc" && (
           <ul className="list-group">
             {currentQuestion.answers.map(
               (answer: {
                 value:
                   | string
                   | number
                   | boolean
                   | React.ReactElement<
                       any,
                       string | React.JSXElementConstructor<any>
                     >
                   | Iterable<React.ReactNode>
                   | React.ReactPortal
                   | null
                   | undefined;
               }) => (
                 <li className="list-group-item">
                   <label>
                     <input type="radio" name="MC" />
                     &nbsp; {answer.value}
                   </label>
                 </li>
               )
             )}
           </ul>
         )}


         {currentQuestion.type === "tf" && (
           <ul className="list-group">
             <li className="list-group-item">
               <label>
                 <input type="radio" name="TF" />
                 &nbsp; True
               </label>
             </li>
             <li className="list-group-item">
               <label>
                 <input type="radio" name="TF" />
                 &nbsp; False
               </label>
             </li>
           </ul>
         )}


         {currentQuestion.type === "fb" && (
           <ul className="list-group">
             {currentQuestion.answers.map(
               (answer: {
                 value:
                   | string
                   | number
                   | boolean
                   | React.ReactElement<
                       any,
                       string | React.JSXElementConstructor<any>
                     >
                   | Iterable<React.ReactNode>
                   | React.ReactPortal
                   | null
                   | undefined;
               }) => (
                 <li className="list-group-item">
                   <textarea
                     style={{ border: "1px solid" }}
                     name="FB"
                   ></textarea>
                 </li>
               )
             )}
           </ul>
         )}
       </li>
     </ul>


     <div className="float-right">
       <button
         type="button"
         className="btn modules-buttons-styles "
         onClick={handleNext}
       >
         Next{" "}
         <FaCaretRight className="fa fa-caret-right publish-all-button-icon-style" />
       </button>
     </div>


     <div className="float-right">
       <button
         type="button"
         className="btn modules-buttons-styles "
         onClick={handleBack}
       >
         <FaCaretLeft className="fa fa-caret-left publish-all-button-icon-style" />{" "}
         Back
       </button>
     </div>


     <br />
     <br />
     <div className="submit-box">
       <div className="float-right">
         <span>
           Quiz saved at {new Date().toLocaleTimeString()}
           &nbsp; &nbsp;
           <button
             type="button"
             className="btn modules-buttons-styles float-right"
           >
             Submit Quiz
           </button>
         </span>
       </div>
     </div>


     <br />
     <br />
     <br />
     <Link
       to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Edit`}
       className="btn modules-publish-button-style"
       style={{ width: "100%", textAlign: "left" }}
     >
       {<FaPencilAlt className="fa fa-question-circle fs-6" />}
       Keep Editing This Quiz
     </Link>


     <br />
     <br />
     <h4>Questions</h4>


     {questions.map((question, index) => (
       <>
         <span onClick={() => handleQuestionClick(index)}>
           {" "}
           &nbsp; &nbsp;{" "}
           <FaQuestionCircle
             style={{ color: "gray" }}
             className="fa fa-question-circle fs-6"
           />
           &nbsp;
         </span>{" "}
         <span
           className="link-icon-style"
           onClick={() => handleQuestionClick(index)}
         >
           {" "}
           Question {index + 1}
         </span>
         <br />
       </>
     ))}
   </div>
 );
}
}


export default QuizPreview;


