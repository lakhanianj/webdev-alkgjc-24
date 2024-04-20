import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;

  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };

  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  // On Your Own 3.2.4
  const [module, setModule] = useState({
    id: "M1", name: "Wk 1 - Learning HTML",
    description: "Learn Basic HTML",
    course: "CS4550",
  });
  const MODULE_URL = `${API_BASE}/a5/module`;
  
  return (
    <div>
      <h3>Working With Objects</h3>
      <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
        ...assignment, title: e.target.value
      })}
        value={assignment.title} type="text" />
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>

      <h4>Retrieving Objects</h4>
      <a href={`${ASSIGNMENT_URL}`}>
        Get Assignment
      </a>
      {/* On Your Own 3.2.4 */}
      <br />
      <a href={`${MODULE_URL}`}>
        Get Module
      </a>

      <h4>Retrieving Properties</h4>
      <a href={`${ASSIGNMENT_URL}/title`}>
        Get Title
      </a>
      {/* On Your Own 3.2.4 */}
      <br />
      <a href={`${MODULE_URL}/name`}>
        Get Module Name
      </a>

      <h4>Modifying Properties</h4>
      <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input type="text"
        onChange={(e) => setAssignment({
          ...assignment,
          title: e.target.value
        })}
        value={assignment.title} />
      {/* On Your Own 3.2.4 */}
      <br />
      <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update Assignment Score
      </a>
      <input type="number"
        onChange={(e) => setAssignment({
          ...assignment,
          score: parseInt(e.target.value)
        })}
        value={assignment.score} />
      <br />

      <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
        Update Assignment Completed
      </a>
      <label>
        <input type="checkbox" checked={assignment.completed}
          onChange={() => setAssignment({
            ...assignment,
            completed: !assignment.completed
          })} />
        Completed
      </label>
      <br />

      <a href={`${MODULE_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <input type="text"
        onChange={(e) => setModule({
          ...module,
          name: e.target.value
        })}
        value={module.name} />
      <br />

      <a href={`${MODULE_URL}/description/${module.description}`}>
        Update Module Description
      </a>
      <textarea
        onChange={(e) => setModule({
          ...module,
          description: e.target.value
        })}
        value={module.description} />


    </div>
  );
}
export default WorkingWithObjects;