import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const QUESTIONS_API = `${API_BASE}/api/questions`;

export const updateQuestion = async (question: any) => {
    const response = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
};

export const deleteQuestion = async (questionId: string) => {
    const response = await axios
        .delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const findQuestionById = async (questionId: any) => {
    const response = await axios.get(
        `${QUESTIONS_API}/${questionId}`
    );
    return response.data;
};

export const createQuestion = async (question: any) => {
    const response = await axios.post(`${QUESTIONS_API}`, question);
    return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
    if (!quizId) {
        return [];
    }
    const response = await axios.get(`${QUESTIONS_API}`);
    const questions = response.data.filter((question: any) => question.quiz === quizId)
    return questions;
};
