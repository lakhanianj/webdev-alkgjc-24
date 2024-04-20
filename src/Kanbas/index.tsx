import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Account from "./Account";

const API_BASE = process.env.REACT_APP_API_BASE;

axios.defaults.withCredentials = true;

function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const COURSES_API = `${API_BASE}/api/courses`;
  
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };

  useEffect(() => {
    findAllCourses();
  }, []);

  const [course, setCourse] = useState({
    _id: new Date().getTime().toString(),
    name: "New Course",
    number: "0000",
    course_addr: "0000.202430",
    short_desc: "Course Description",
    startDate: "2024-01-10",
    endDate: "2024-05-15",
    image: "new_Course.jpg",
    course_title_color: "rgb(87, 82, 82)"
  });

  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([...courses, response.data]);
    setCourse({
      _id: new Date().getTime().toString(),
      name: "New Course",
      number: "0000",
      course_addr: "0000.202430",
      short_desc: "Course Description",
      startDate: "2024-01-10",
      endDate: "2024-05-15",
      image: "new_Course.jpg",
      course_title_color: "rgb(87, 82, 82)"
    })
  };

  const deleteCourse = async (courseId: any) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          setCourse({
            _id: new Date().getTime().toString(),
            name: "New Course",
            number: "0000",
            course_addr: "0000.202430",
            short_desc: "Course Description",
            startDate: "2024-01-10",
            endDate: "2024-05-15",
            image: "new_Course.jpg",
            course_title_color: "rgb(87, 82, 82)"
          })
          return c;
        }
      })
    );
  };

  return (
    <Provider store={store}>
      <div className="d-flex" style={{ minHeight: "100%" }}>
        <div className="d-none d-md-block">
          <KanbasNavigation />
        </div>

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse} />
            } />
            <Route path="Courses/*" />
            <Route path="Courses/:courseId/*" element={<Courses/>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;