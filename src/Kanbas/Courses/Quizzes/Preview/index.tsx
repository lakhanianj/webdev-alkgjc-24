import React, { useState } from "react";
import "./index.css";


import { FaEllipsisV, FaCheckCircle, FaCaretDown, FaPlus, FaLink, FaExternalLinkAlt, FaRegCheckCircle, FaCaretRight, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
function QuizPreview() {
 return (
   <div className="p-4 dashboard-height-margin">
   <h1 className="heading-style d-none d-md-block d-lg-block d-xl-block d-xxl-block">Q1 - HTML
   </h1>
   <div className="imp-note col-sm-10">
   <FaExclamationCircle className="fa fa-exclamation-circle"
           />  This is a preview of the published version of the quiz
   </div>
   <div>Started: Nov 29at 8:19am</div>
   <h2>Quiz Instructions</h2>
   <hr className="col-sm-10"></hr>






   <ul className="list-group wd-quizzes col-sm-10">


           <li className="list-group-item">
             <div className="list-group-header-style">
               <span className="list-group-title-style">&nbsp; Question 1</span>
               <span className="float-end">
                 Pts 1
               </span>
             </div>


         
               <ul className="list-group">
                   <li className="list-group-item top-bottom-padding-10">  <> 123 </>
                   </li>
               </ul>
           </li>
       </ul>


       <div className="float-right">
          <button type="button" className="btn modules-buttons-styles">
           Next <FaCaretRight className="fa fa-caret-down publish-all-button-icon-style"
           />
          </button>
     </div>
     <br/>
     <br/>
  <div className=" submit-box">
     <div className="float-right">
          <button type="button" className="btn modules-buttons-styles">
           Submit Quiz
          </button>


     </div>
     </div>


     </div>
 )
}
export default QuizPreview;


