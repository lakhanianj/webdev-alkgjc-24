import React, { useEffect, useState } from "react";
import "../../Courses/index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";
import { modules } from "../../Database";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaCaretDown,
  FaPlus,
  FaLink,
  FaExternalLinkAlt,
  FaRegCheckCircle,
  FaTrash,
  FaPencilAlt,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ModuleList() {
  const { courseId } = useParams();

  useEffect(() => {
    client
      .findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId]);

  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );

  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );

  const dispatch = useDispatch();

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);
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
            <FaRegCheckCircle className="modules-publish-button-icon-style fs-5" />
            Publish All
            <FaCaretDown className="fa fa-caret-down publish-all-button-icon-style" />
          </button>

          <button
            type="button"
            className="btn modules-module-button-style"
            onClick={handleAddModule}
          >
            + Module
          </button>

          <button type="button" className="btn modules-publish-button-style">
            <FaEllipsisV className="fa fa-ellipsis-v" />
          </button>
        </div>
        <br />

        <hr className="courses-column-hr-style" />
        <h5 className="form-title-style">Add/Update Module</h5>

        <li className="list-group-item">
          <div className="mb-2">
            <label htmlFor="module_name" className="form-input-label-style">
              Module Name
            </label>
            <input
              className="form-control"
              id="module_name"
              value={module.name}
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
            />
          </div>

          <div className="mb-2">
            <label htmlFor="module_desc" className="form-input-label-style">
              Module Description
            </label>
            <textarea
              className="form-control"
              id="module_desc"
              value={module.description}
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            />
          </div>
        </li>

        <button
          type="button"
          className="btn modules-buttons-styles margin-right-10"
          onClick={handleAddModule}
        >
          Add
        </button>

        <button
          type="button"
          className="btn modules-buttons-styles"
          onClick={handleUpdateModule}
        >
          Update
        </button>

        <ul className="list-group wd-modules margin-top-20">
          {moduleList
            .filter((module) => module.course === courseId)
            .map((module, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => setSelectedModule(module)}
              >
                <div className="list-group-header-style">
                  <FaEllipsisV className="no-right-padding-margin" />
                  <FaEllipsisV className="no-left-padding-margin" />
                  <FaCaretDown className="no-left-padding-margin me-2" />
                  <span className="list-group-title-style">{module.name}</span>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaCaretDown className="left-padding-0" />
                    <FaPlus className="ms-2" />
                    <button
                      className="transparent-background-button"
                      onClick={() => dispatch(setModule(module))}
                    >
                      <FaPencilAlt className="ms-2" />
                    </button>
                    <button
                      className="transparent-background-button"
                      onClick={() => handleDeleteModule(module._id)}
                    >
                      <FaTrash className="ms-2" />
                    </button>
                    <FaEllipsisV className="ms-2" />
                  </span>
                </div>
                {selectedModule && selectedModule?._id === module._id && (
                  <ul className="list-group">
                    {module.lessons?.map(
                      (lesson: { type: string; name: string }) => (
                        <li className="list-group-item top-bottom-padding-10">
                          {lesson.type === "external" ? (
                            <>
                              <FaLink className="no-left-padding-margin" />
                              <Link
                                to={``}
                                className="list-group-slide-item-style"
                              >
                                {" "}
                                {lesson.name}{" "}
                              </Link>
                              <FaExternalLinkAlt className="link-icon-style" />
                            </>
                          ) : (
                            <>
                              {" "}
                              <FaEllipsisV className="me-2" /> {lesson.name}{" "}
                            </>
                          )}
                          <span className="float-end">
                            <FaCheckCircle className="text-success" />
                            <FaEllipsisV className="ms-2" />
                          </span>
                        </li>
                      )
                    )}
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
