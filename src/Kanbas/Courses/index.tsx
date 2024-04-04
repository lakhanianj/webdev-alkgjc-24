import { courses } from "../../Kanbas/Database";
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";

import "./index.css";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { FaChevronDown, FaTachometerAlt, FaHome, FaBook, FaDesktop, FaInbox, FaRegArrowAltCircleRight, FaRegCalendarAlt, FaRegClock, FaRegQuestionCircle, FaRegUserCircle, FaRegCheckSquare, FaPeopleArrows, FaRegStickyNote, FaAddressBook, FaBullhorn, FaBullseye, FaCircleNotch, FaComments, FaFileAlt, FaFolder, FaPlug, FaRegCircle, FaRocket, FaGlasses } from "react-icons/fa";
import "bootstrap/js/src/collapse.js";
import Quizzes from "./Quizzes";
import QuizzesEdit from "./Quizzes/Edit";

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

function Courses() {
  const path = useLocation();
  const pathSplit = path.pathname.split('/');
  const lastPathItem = decodeURI(pathSplit[pathSplit.length - 1]);
  // const secondLastPathItem = decodeURI(pathSplit[pathSplit.length - 2]);
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  const sandwichCollapseLinks = [
    { label: "Dashboard", icon: <FaTachometerAlt className="navbar-icon-style fs-1" /> },
    { label: "Account", icon: <FaRegUserCircle className="navbar-icon-style wd-color fs-1" /> },
    { label: "Courses", icon: <FaBook className="navbar-icon-style fs-1" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="navbar-icon-style fs-1" /> },
    { label: "Inbox", icon: <FaInbox className="navbar-icon-style fs-1" /> },
    { label: "Studio", icon: <FaDesktop className="navbar-icon-styles fs-1" /> },
    { label: "Commons", icon: <FaRegArrowAltCircleRight className="navbar-icon-style fs-1" /> },
    { label: "History", icon: <FaRegClock className="navbar-icon-style fs-1" /> },
    { label: "Help", icon: <FaRegQuestionCircle className="navbar-icon-style fs-1" /> },
  ];

  const chevronCollapseLinks = [
    { label: "Home", icon: <FaHome className="navbar-icon-style fs-3" /> },
    { label: "Modules", icon: <FaCircleNotch className="navbar-icon-style fs-3" /> },
    { label: "Piazza", icon: <FaPlug className="navbar-icon-style fs-3" /> },
    { label: "Zoom", icon: <FaPlug className="navbar-icon-style fs-3" /> },
    { label: "Assignments", icon: <FaRegStickyNote className="navbar-icon-style fs-3" /> },
    { label: "Quizzes", icon: <FaRocket className="navbar-icon-styles fs-3" /> },
    { label: "Grades", icon: <FaRegCheckSquare className="navbar-icon-style fs-3" /> },
    { label: "People", icon: <FaPeopleArrows className="navbar-icon-style fs-3" /> },
    { label: "Panopto Video", icon: <FaPlug className="navbar-icon-style fs-3" /> },
    { label: "Discussions", icon: <FaComments className="navbar-icon-style fs-3" /> },
    { label: "Announcements", icon: <FaBullhorn className="navbar-icon-style fs-3" /> },
    { label: "Pages", icon: <FaRegStickyNote className="navbar-icon-style fs-3" /> },
    { label: "Files", icon: <FaFolder className="navbar-icon-style fs-3" /> },
    { label: "Rubrics", icon: <FaFileAlt className="navbar-icon-style fs-3" /> },
    { label: "Outcomes", icon: <FaBullseye className="navbar-icon-style fs-3" /> },
    { label: "Collaborations", icon: <FaRegCircle className="navbar-icon-style fs-3" /> },
    { label: "Syllabus", icon: <FaAddressBook className="navbar-icon-style fs-3" /> },
    { label: "Progress Reports (EAB Navigate)", icon: <FaPlug className="navbar-icon-style fs-3" /> },
    { label: "Settings", icon: <FaPlug className="navbar-icon-style fs-3" /> },
  ];

  return (

    <div className="height-100-vh">

      {/* navbar */}
      <div className="d-block d-md-none text-center navbar-title-style center">
        {course?.course_addr} <br />
        {lastPathItem}
      </div>
      <div className="d-block d-md-none">
        <div className="navbar-heading-bar">
          <p className="d-inline-flex">
            <button
              className="btn btn-primary navbar-sandwich"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSandwich"
              aria-controls="navbarSandwich"
              aria-expanded="false"
              aria-label="Toggle navigation Sandwich"
            >
              <span><HiMiniBars3 className="white-color" /></span>
            </button>

            <button
              className="btn navbar-chevron border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarChevron"
              aria-controls="navbarChevron"
              aria-expanded="false"
              aria-label="Toggle navigation Chevron"
            >
              <span><FaChevronDown className="white-color" /></span>
            </button>
          </p>

          {/* Sandwich Collapse Navbar */}
          <div
            className="collapse collapse-horizontal padding-top-45" id="navbarSandwich">
            <ul className="card card body navbar-sandwich-collapse-card">
              {sandwichCollapseLinks.map((link, index) => (
                <Link to={`/Kanbas/${link.label}`}
                  className="nav-link active navbar-link-style padding-bottom-25"
                  aria-current="page"
                >{link.icon} {link.label} </Link>
              ))}
            </ul>
          </div>

          {/* Chevron Collapse Navbar */}
          <div className="collapse padding-top-45" id="navbarChevron">
            <ul className="card card body navbar-chevron-collapse-card">
              {chevronCollapseLinks.map((link, index) => (
                <Link to={`/Kanbas/Courses/${courseId}/${link.label}`}
                  className="nav-link active navbar-link-style"
                  aria-current="page"
                >{link.icon} {link.label} </Link>
              ))}

            </ul>
          </div>
        </div>
      </div>


      {/* breadcrumb */}
      <HiMiniBars3 className="fs-3 breadcrumb-bar-style d-none d-md-block" />
      <nav className="breadcrumb-nav-style d-none d-md-block">

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={``} className="breadcrumb-course-link-style">{course?.course_addr}</Link>
          </li>
          <li className="breadcrumb-item active breadcrumb-page-link-style" aria-current="page">{lastPathItem}</li>
        </ol>
      </nav>

      {/* breadcrumb hr line */}
      <div className="margin-top-70">
        <hr className="d-none d-md-block" />
      </div>

      <div className="d-none d-md-block">
        <button
          type="button"
          className="btn modules-buttons-styles student-view-button-style"
        >
          <FaGlasses className="padding-right-10 fs-2" />Student View
        </button>
      </div>

      <div className="flex-row-structure">
        {/* course navigation */}
        <div className="d-none d-md-block course-nav-positioning">
          <CourseNavigation />
        </div>


        <div className="flex-fill path-element-display">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Zoom" element={<h1>Zoom</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/Edit/:quizId" element={<QuizzesEdit />} />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="People" element={<h1>People</h1>} />
            <Route path="Panopto Video" element={<h1>Panopto Video</h1>} />
            <Route path="Discussions" element={<h1>Discussions</h1>} />
            <Route path="Announcements" element={<h1>Announcements</h1>} />
            <Route path="Pages" element={<h1>Pages</h1>} />
            <Route path="Files" element={<h1>Files</h1>} />
            <Route path="Rubrics" element={<h1>Rubrics</h1>} />
            <Route path="Outcomes" element={<h1>Outcomes</h1>} />
            <Route path="Collaborations" element={<h1>Collaborations</h1>} />
            <Route path="Progress Reports (EAB Navigate)" element={<h1>Progress Reports (EAB Navigate)</h1>} />
            <Route path="Settings" element={<h1>Settings</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>


    </div>

  );
}
export default Courses;
