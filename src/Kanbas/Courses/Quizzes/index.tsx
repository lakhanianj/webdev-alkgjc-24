import { FaBan, FaCaretDown, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { deleteQuiz, findQuizzesForCourse, updateQuiz } from "./client";
import { useDispatch, useSelector } from "react-redux";
import {
  removeQuiz,
  setQuiz,
  setQuizzes,
  updateQuiz as updateQuizRedux,
} from "./reducer";
import { KanbasState } from "../../store";
import { setQuestion, setQuestions } from "./Edit/QuestionTypes/reducer";

function Quizzes() {
  const location = useLocation();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  // const [quiz, setQuiz] = useState({
  //   course: courseId,
  //   name: "Unnamed Quiz",
  //   dueDate: "",
  //   availableDate: "",
  //   pts: 0,
  //   numQuestions: 0,
  //   published: false,
  //   description: "",
  //   shuffled: true,
  //   quizType: "graded-quiz",
  //   assignmentType: "quizzes",
  //   timeLimit: 20,
  //   multipleAttempts: false,
  //   showCorrectAnswers: true,
  //   accessCode: "",
  //   oneQuestionAtATime: true,
  //   lockdown: false,
  //   requiredToViewResult: false,
  //   webcamReq: false,
  //   lockAfterAnswering: false,
  //   untilDate: "",
  //   forWhom: "",
  // });

  // const [quizzes, setQuizzes] = useState([]);

  const handleDeleteQuiz = (quizId: string) => {
    deleteQuiz(quizId).then((status) => {
      dispatch(removeQuiz(quizId));
    });
  };

  const handlePublishQuiz = async (quiz: any) => {
    updateQuiz({
      ...quiz,
      published: !quiz.published,
    }).then((status) => {
      dispatch(
        updateQuizRedux({
          ...quiz,
          published: !quiz.published,
        })
      );
    });
  };

  // const quizList = quizzes.filter((quiz: any) => quiz.course === courseId);

  // function getMaxId() {
  //   return Math.max(...quizList.map((quiz: any) => parseInt(quiz._id)), 0);
  // }

  const [contextMenuState, setContextMenuState] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleContextMenu = (quizId: string) => {
    setContextMenuState((prevState) => ({
      ...prevState,
      [quizId]: !prevState[quizId],
    }));
  };

  function formatDate(date: Date) {
    const dateString = date.toDateString();
    const hours = date.getHours();
    let timeString;
    if (hours === 0) {
      timeString = `12:${("0" + date.getMinutes()).slice(-2)}am`; // Midnight
    } else if (hours < 12) {
      timeString = `${hours}:${("0" + date.getMinutes()).slice(-2)}am`; // AM hours
    } else if (hours === 12) {
      timeString = `12:${("0" + date.getMinutes()).slice(-2)}pm`; // Noon
    } else {
      timeString = `${hours - 12}:${("0" + date.getMinutes()).slice(-2)}pm`; // PM hours
    }
    const [month, day] = dateString.split(" ").slice(1, 3); // Extract month and day
    return `${month} ${day} at ${timeString}`;
  }

  function quizAvailability(quiz: {
    _id: string;
    course: string;
    name: string;
    dueDate: string;
    availableDate: string;
    pts: number;
    numQuestions: number;
    published: boolean;
    instructions: string;
    shuffled: boolean;
    quizType: string;
    assignmentType: string;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamReq: boolean;
    lockAfterAnswering: boolean;
    untilDate: string;
  }) {
    const due = new Date(quiz.dueDate);
    const available = new Date(quiz.availableDate);
    const cur = new Date();

    if (cur > due) {
      return "\nClosed";
    } else if (cur < available) {
      return "\nNot available until ";
    } else {
      return "\nAvailable";
    }
  }

  const handleNewQuiz = () => {
    dispatch(
      setQuiz({
        course: courseId,
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
        lockdown: false,
        requiredToViewResult: false,
        webcamReq: false,
        lockAfterAnswering: false,
        untilDate: "",
        forWhom: "",
      })
    );
    dispatch(setQuestions([]));
    dispatch(
      setQuestion({
        title: "",
        course: "",
        quiz: "",
        type: "mc",
        pts: 0,
        question: "",
        answers: [{ _id: "", value: "" }],
        correctAnswer: "-",
      })
    );
  };

  const fetchQuizzes = async () => {
    const quizzes = await findQuizzesForCourse(courseId ?? "");
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <>
      {/* Buttons */}
      <div>
        <div className="flex-row-structure flex-fill margin-0">
          <div className="float-left">
            <input
              type="textbox"
              className="form-control"
              id="input1"
              placeholder="Search For Quiz"
            ></input>
          </div>

          <div className="float-right assignments-float-right-buttons">
            <Link to={`${location.pathname}/New/Edit`} onClick={handleNewQuiz}>
              <button type="button" className="btn modules-module-button-style">
                + Quiz
              </button>
            </Link>

            <button type="button" className="btn modules-publish-button-style">
              <FaEllipsisV className="fa fa-ellipsis-v" />
            </button>
          </div>
        </div>

        <hr className="courses-column-hr-style" />

        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <div className="list-group-header-style">
              <FaCaretDown className="no-left-padding-margin me-2" />

              <span className="list-group-title-style">Quizzes</span>
              <span className="float-end"></span>
            </div>

            <ul className="list-group">
              {quizzes.map((quiz: any) => (
                <li className="list-group-item top-bottom-padding-10">
                  <BsRocketTakeoff className="no-right-padding-margin text-success" />
                  <Link
                    className="assignment-item-style"
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Details`}
                    onClick={() => {
                      dispatch(setQuiz(quiz));
                    }}
                  >
                    {quiz.name}
                  </Link>
                  <br />

                  <span className="small-bold-quiz-text">
                    {quizAvailability(quiz)}
                  </span>
                  <span className="small-text">
                    {quizAvailability(quiz) === "\nNot available until "
                      ? formatDate(new Date(quiz.availableDate))
                      : ""}
                  </span>
                  <span className="small-gray-assignment-text">|</span>
                  <span className="small-gray-assignment-text bold-text ">
                    Due{" "}
                  </span>
                  <span className="small-text">
                    {formatDate(new Date(quiz.dueDate))}
                  </span>
                  <span className="small-gray-assignment-text">|</span>
                  <span className="small-gray-assignment-text">
                    {quiz.pts} pts
                  </span>
                  <span className="small-gray-assignment-text">|</span>
                  <span className="small-gray-assignment-text">
                    {quiz.numQuestions} questions
                  </span>

                  <span className="float-end">
                    <button
                      className="transparent-button"
                      onClick={() => handlePublishQuiz(quiz)}
                    >
                      {quiz.published ? (
                        <FaCheckCircle className="publish-icon text-success" />
                      ) : (
                        <FaBan className="text-danger publish-icon" />
                      )}
                    </button>

                    <button
                      className="left-margin-smaller"
                      onClick={() => toggleContextMenu(quiz._id)}
                    >
                      <button
                        type="button"
                        className="btn modules-publish-button-style"
                      >
                        <FaEllipsisV className="fa fa-ellipsis-v" />
                      </button>
                    </button>
                  </span>
                  {contextMenuState[quiz._id] && (
                    <div className="float-end">
                      <br></br>
                      <div className="button-group">
                        <button
                          className="btn rounded green-button modules-module-button-style"
                          onClick={() => handlePublishQuiz(quiz)}
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </button>
                        <Link to={`${location.pathname}/${quiz._id}/Edit`}>
                          <button
                            className="btn rounded blue-button modules-module-button-style"
                            onClick={() => {
                              dispatch(setQuiz(quiz));
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteQuiz(quiz._id)}
                          className="btn rounded modules-module-button-style"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Quizzes;
