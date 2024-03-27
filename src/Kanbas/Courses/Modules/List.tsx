import React, { useState } from "react";
// import "./index.css"; 
import "../../Courses/index.css";

import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaCaretDown, FaPlus, FaLink, FaExternalLinkAlt, FaRegCheckCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <>
      {/* Buttons */}
      <div>
        <div className="float-right">
          <button type="button" className="btn modules-buttons-styles">
            Collapse All
          </button>

          <button type="button" className="btn modules-buttons-styles">
            View Progress
          </button>

          <button type="button" className="btn modules-publish-button-style">
            <FaRegCheckCircle
              className="modules-publish-button-icon-style fs-5"
            />
            Publish All<FaCaretDown className="fa fa-caret-down publish-all-button-icon-style"
            />
          </button>

          <button type="button" className="btn modules-module-button-style">
            + Module
          </button>

          <button type="button" className="btn modules-publish-button-style">
            <FaEllipsisV className="fa fa-ellipsis-v" />
          </button>

        </div>
        <br />

        <hr className="courses-column-hr-style" />

        <ul className="list-group wd-modules">
          {modulesList.map((module, index) => (
            <li key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}>
              <div className="list-group-header-style">
                <FaEllipsisV className="no-right-padding-margin" />
                <FaEllipsisV className="no-left-padding-margin" />
                <FaCaretDown className="no-left-padding-margin me-2" />

                <span className="list-group-title-style">{module.name}</span>
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaCaretDown className="left-padding-0" />
                  <FaPlus className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>

              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson, index) => (
                    <li className="list-group-item top-bottom-padding-10" key={index}>
                      {lesson.type === "external" ?
                        <><FaLink className="no-left-padding-margin" />
                          <Link to={``} className="list-group-slide-item-style"> {lesson.name} </Link>
                          <FaExternalLinkAlt className="link-icon-style" /></>
                        : <> <FaEllipsisV className="me-2" /> {lesson.name} </>}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default ModuleList;

