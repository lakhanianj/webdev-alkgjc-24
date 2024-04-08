import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { Provider } from "react-redux";
import store from "./store";

function Kanbas() {
  return (
    <Provider store={store}>
      <div className="d-flex" style={{ minHeight: "100%" }}>
        <div className="d-none d-md-block">
          <KanbasNavigation />
        </div>

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Courses/*" />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;
