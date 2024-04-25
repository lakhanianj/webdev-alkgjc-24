import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axios
        .delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const findQuizById = async (quizId: any) => {
    const response = await axios.get(
        `${QUIZZES_API}/${quizId}`
    );
    return response.data;
};

export const createQuiz = async (quiz: any) => {
    const response = await axios.post(`${QUIZZES_API}`, quiz);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
    if (!courseId) {
        return [];
    }
    const response = await axios.get(`${QUIZZES_API}`);
    const quizzes = response.data.filter((quiz: any) => quiz.course === courseId)
    return quizzes;
};
