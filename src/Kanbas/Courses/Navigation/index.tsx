import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
import axios from "axios";
import { useState, useEffect } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

axios.defaults.withCredentials = true;

function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom",  
    "Assignments", "Quizzes", "Grades",
    "People", "Panopto Video", "Discussions", "Announcements",
    "Pages", "Files", "Rubrics", "Outcomes", "Collaborations",
    "Progress Reports (EAB Navigate)", "Settings"];
  const { pathname } = useLocation();
  const { courseId } = useParams();
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });

  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
    <ul className="wd-navigation">
      <div className="small-gray-course-title">
        {course?.short_desc}
      </div>
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>

  );
}
export default CourseNavigation;