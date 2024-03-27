import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
import { courses } from "../../Database";
function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades",
    "People", "Panopto Video", "Discussions", "Announcements",
    "Pages", "Files", "Rubrics", "Outcomes", "Collaborations",
    "Progress Reports (EAB Navigate)", "Settings"];
  const { pathname } = useLocation();
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

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