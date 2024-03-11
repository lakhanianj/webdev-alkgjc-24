import { FaBan, FaBell, FaBullhorn, FaBullseye, FaChartBar, FaCircle, FaDownload, FaFileImport, FaRegCheckCircle } from "react-icons/fa";
import ModuleList from "../Modules/List";
import "../../Courses/index.css";
import { Link, useParams } from "react-router-dom";
import { reminders } from "../../Database";


function Home() {
    const { courseId } = useParams();
    const reminderList = reminders.filter((reminder) => reminder.course === courseId);
    const statusButtons = [
        { label: "Import Existing Content", icon: <FaFileImport className="padding-right-8 fs-4" /> },
        { label: "Import From Commons", icon: <FaDownload className="padding-right-8 fs-4" /> },
        { label: "Choose Home Page", icon: <FaBullseye className="padding-right-8 fs-4" /> },
        { label: "View Course Stream", icon: <FaChartBar className="padding-right-8 fs-4" /> },
        { label: "New Announcement", icon: <FaBullhorn className="padding-right-8 fs-4" /> },
        { label: "New Analytics", icon: <FaChartBar className="padding-right-8 fs-4" /> },
        { label: "View Course Notifications", icon: <FaBell className="padding-right-8 fs-4" /> }
    ];

    return (
        <div className="flex-row-structure">
            <div className="flex-grow-1">
                <ModuleList />
            </div>
            <div className="flex-grow-0 me-2 d-none d-lg-block course-status-whole-section">
                <div className="font-20">Course Status</div>

                {/* Unpublish/Publish Button */}
                <div className="wd-flex-row-container padding-bottom-20">
                    <button type="button" className="btn courses-unpublish-button-style">
                        <FaBan className="padding-right-4 fs-4" />Unpublish
                    </button>
                    <button
                        type="button"
                        className="btn disabled courses-publish-button-style">
                        <FaRegCheckCircle className="course-button-publish-icon-style fs-4" />Publish
                    </button>
                </div>

                {/* Other Vertical Buttons */}
                {statusButtons.map((button, index) => (
                    <button key={index} type="button" className="btn course-button-style">
                        <div className="course-button-icon-div-style">
                            {button.icon} {button.label}
                        </div>
                    </button>
                ))}

                {/* Notifications/Reminders */}
                <div className="course-titles-style">To Do</div>
                <hr className="margin-top-0" />

                {reminderList.map((reminder, index) => (
                    <div key={index} className="padding-bottom-10">
                        <FaCircle className="font-red fs-10" />
                        <Link to={``} className="red-course-status-text">{reminder.name}</Link>
                        <br />
                        <span className="small-gray-course-status-text"
                        >{reminder.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;