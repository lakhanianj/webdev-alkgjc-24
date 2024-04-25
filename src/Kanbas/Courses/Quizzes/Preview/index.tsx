import React from "react";
import "./index.css";
import { FaCaretLeft, FaCaretRight, FaExclamationCircle, FaPencilAlt, FaQuestionCircle } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { quizQuestions } from "../../../Database";


function QuizPreview() {
  const [date, setDate] = useState(new Date());


  const { courseId } = useParams();

  const path = useLocation();
  const pathSplit = path.pathname.split('/');
  const lastPathItem = decodeURI(pathSplit[pathSplit.length - 1]);
  const secondLastPathItem = decodeURI(pathSplit[pathSplit.length - 2]);

  const dispatch = useDispatch();

  const quizzes = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );

  const quizList = quizzes.filter(
    (quiz) => quiz.course === courseId && quiz._id === secondLastPathItem);

  const quiz = (quizList[0]);

  const questionsAll = useSelector(
    (state: KanbasState) => state.questionReducer.questions
  );

  const questionList = questionsAll.filter(
    (question) => question.course === courseId && question.quiz === quiz._id);

  const questionCount = questionList.length;

  // let questionNumber = 0
 const [questionNumber, setQuestionNumber] = useState(0);


  // console.log("here")
  // console.log(questionCount)


  const [currentQuestion, setCurrentQuestion] = useState(questionList[questionNumber]);

  function handleNext() {
    if (questionNumber < questionCount - 1) {
      setQuestionNumber(questionNumber + 1);
      setCurrentQuestion(questionList[questionNumber]);
    }
    else {
      setQuestionNumber(questionCount - 1);
      setCurrentQuestion(questionList[questionNumber]);
    }
  }

  function handleBack() {
    if (questionNumber > 0) {
    setQuestionNumber(questionNumber - 1);
    setCurrentQuestion(questionList[questionNumber]);
    }
    else {
      setQuestionNumber(0);
      setCurrentQuestion(questionList[questionNumber]);
    }
  }

  function handleQuestionClick(question: any) {
    setQuestionNumber(question.questionNo - 1);
    setCurrentQuestion(questionList[questionNumber]);
  }

  // console.log(questions)

  return (
    <div className="p-4 dashboard-height-margin">
      <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">{quiz.name}
      </h1>
      <div className="imp-note">
        <FaExclamationCircle className="fa fa-exclamation-circle"
        />  This is a preview of the published version of the quiz
      </div>
      <div className="margin-bottom-15"></div>
      <div>Started: {date.toDateString()} at {date.toLocaleTimeString()}</div>
      <div className="margin-bottom-8"></div>
      <h2>Quiz Instructions</h2>
      <hr className=""></hr>


      <ul className="list-group wd-quizzes col-sm-10">
        <li className="list-group-item">
          <div className="list-group-header-style">
            <span className="list-group-title-style">&nbsp; Question {currentQuestion.questionNo}</span>
            <span className="float-end">
              {currentQuestion.pts} pts
            </span>
          </div>

          <ul className="list-group">
            <li className="list-group-item top-bottom-padding-10">  <> {currentQuestion.question} </>
            </li>
          </ul>

          {currentQuestion.type === "mc" && (
            <ul className="list-group">
              {currentQuestion.answers.map((answer: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                <li className="list-group-item">
                  <label>
                    <input type="radio" name='MC' />
                    &nbsp; {answer.value}
                  </label>
                </li>
              ))}
            </ul>
          )}


          {currentQuestion.type === "tf" && (
            <ul className="list-group">
                <li className="list-group-item">
                  <label>
                    <input type="radio" name='TF' />
                    &nbsp; True
                  </label>
                  </li>
                  <li className="list-group-item">
                  <label>
                    <input type="radio" name='TF' />
                    &nbsp; False
                  </label>
                </li>
    
            </ul>
          )}

          {currentQuestion.type === "fb" && (
            <ul className="list-group">
              {currentQuestion.answers.map((answer: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                <li className="list-group-item">
                  <textarea style={{ border: "1px solid" }} name='FB'>
                  </textarea>
                </li>
              ))}
            </ul>
          )}


        </li>
      </ul>


      <div className="float-right">
        <button type="button" className="btn modules-buttons-styles "
          onClick={handleNext}>
          Next <FaCaretRight className="fa fa-caret-right publish-all-button-icon-style"
          />
        </button>
      </div>

      <div className="float-right">
        <button type="button" className="btn modules-buttons-styles " 
         onClick={handleBack}>
          <FaCaretLeft className="fa fa-caret-left publish-all-button-icon-style"
          /> Back

        </button>
      </div>

      <br />
      <br />
      <div className="submit-box">

        <div className="float-right">
          <span>
            Quiz saved at {new Date().toLocaleTimeString()}
            &nbsp;
            &nbsp;

            <button type="button" className="btn modules-buttons-styles float-right">
              Submit Quiz
            </button>
          </span>
        </div>
      </div>

      <br />
      <br />
      <br />
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/Edit`}
        className="btn modules-publish-button-style" style={{ width: "100%", textAlign: "left"}} >
          { <FaPencilAlt className="fa fa-question-circle fs-6" />}
        Keep Editing This Quiz
      </Link>

      <br />
      <br />
      <h4>Questions</h4>
      
      {questionList.map((question) => (
        <>
         <span onClick={() => handleQuestionClick(question)}>  &nbsp;  &nbsp; <FaQuestionCircle style={{ color: "gray" }} className="fa fa-question-circle fs-6" />
         &nbsp;</span> <span className="link-icon-style"  onClick={() => handleQuestionClick(question)}> Question {question.questionNo}</span>
        <br/>
        </>
        
      ))}
     

    </div>
  )
}

export default QuizPreview;