import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaRegClock, FaRegArrowAltCircleRight, FaRegQuestionCircle, FaDesktop } from "react-icons/fa";
function KanbasNavigation() {
  const links = [
    { label: "Account",   icon: <FaRegUserCircle className="wd-kanbas-navigation-icons wd-color" />  },
    { label: "Dashboard", icon: <FaTachometerAlt className="wd-kanbas-navigation-icons" />  },
    { label: "Courses",   icon: <FaBook className="wd-kanbas-navigation-icons " />           },
    { label: "Calendar",  icon: <FaRegCalendarAlt className="wd-kanbas-navigation-icons" /> },
    { label: "Inbox",  icon: <FaInbox className="wd-kanbas-navigation-icons" /> },
    { label: "History",  icon: <FaRegClock className="wd-kanbas-navigation-icons" /> },
    { label: "Studio",  icon: <FaDesktop className="wd-kanbas-navigation-icons" /> },
    { label: "Commons",  icon: <FaRegArrowAltCircleRight className="wd-kanbas-navigation-icons" /> },
    { label: "Help",  icon: <FaRegQuestionCircle className="wd-kanbas-navigation-icons" /> },
  ];
  const { pathname } = useLocation();
  return (
  // <body>
    <ul className="wd-kanbas-navigation">
        <li>
        <Link to={`https://www.northeastern.edu/`}> 
        <img src={`/images/Northeastern_Logo.png`} style={{width: 68}}/>
        </Link>
        </li>
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
        </li>
      ))}
    </ul>
    // </body>
  );
}
export default KanbasNavigation;