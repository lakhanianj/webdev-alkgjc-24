import React from 'react';
import { Link, useParams } from "react-router-dom";

function Quizzes() {
    const { courseId } = useParams();

    return (
        <>
            <h1>Quizzes</h1>
            <Link to={`/Kanbas/Courses/${courseId}/Quizzes/Edit`}> Edit </Link>
        </>
    )
}

export default Quizzes;