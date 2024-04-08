import { FaEllipsisV, FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";
import "../../../Courses/index.css";
import "bootstrap/dist/css/bootstrap.min.css";



export default function EditQuestions() {

    return (
        <div>
            <div className="d-flex justify-content-center align-items-end">

                <button type="button" className="mx-4 btn modules-publish-button-style">
                    <FaPlus></FaPlus> New Question
                </button>


                <button type="button" className="mx-4 btn modules-publish-button-style">
                    <FaPlus></FaPlus> New Question Group
                </button>

                <button type="button" className="mx-4 btn modules-publish-button-style">
                    <FaSearch></FaSearch> Find Questions
                </button>
            </div>
        </div>

    );
}

