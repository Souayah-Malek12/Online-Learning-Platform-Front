import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { useParams } from "react-router-dom";
import { Container, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { fetchCourseDetails } from "../store/courseSlice";

const CourseDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { course, isLoading, error } = useSelector(state => state.course);

    // State to hold user answers
    const [userAnswers, setUserAnswers] = useState([]);

    // Fetch course details when component mounts
    useEffect(() => {
        if (id) {
            dispatch(fetchCourseDetails(id));
        }
    }, [dispatch, id]);

    // Handle changes to answers
    const handleAnswerChange = (quizIndex, questionIndex, answerIndex) => {
        const updatedAnswers = [...userAnswers];
        if (!updatedAnswers[quizIndex]) {
            updatedAnswers[quizIndex] = [];
        }
        updatedAnswers[quizIndex][questionIndex] = answerIndex;
        setUserAnswers(updatedAnswers);
    };

    // Prepare data and navigate to /evaluateQ
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Create an array of quiz responses
        const quizResponses = course.quizzes.map((quiz, quizIndex) => ({
            quizId: quiz._id,
            userAnswers: userAnswers[quizIndex] || [] // Ensure answers exist or default to empty array
        }));
    
        // Navigate to /evaluateQ with state
        navigate('/evaluateQ', { state: { quizResponses } });
    };
    

    // Render loading, error, or course details
    if (isLoading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!course) return <p>No course data available</p>;

    return (
        <Container className="mt-3">
            <h1>{course.title || 'No title available'}</h1>
            <p>{course.description || 'No description available'}</p>
            <h3>Videos:</h3>
            <ul>
                {course.videos && course.videos.length > 0 ? (
                    course.videos.map((video, index) => (
                        <li key={index}>
                            <a href={video} target="_blank" rel="noopener noreferrer">{video}</a>
                        </li>
                    ))
                ) : (
                    <li>No videos available</li>
                )}
            </ul>
            <h3>Quizzes:</h3>
            <Form onSubmit={handleSubmit}>
                <ul>
                    {course.quizzes && course.quizzes.length > 0 ? (
                        course.quizzes.map((quiz, quizIndex) => (
                            <li key={quiz._id}>
                                <h4>Quiz {quizIndex + 1}</h4>
                                <ul>
                                    {quiz.questions && quiz.questions.length > 0 ? (
                                        quiz.questions.map((q, questionIndex) => (
                                            <li key={q._id}>
                                                <h5>{q.question}</h5>
                                                {q.options.map((opt, optIndex) => (
                                                    <Form.Check
                                                        key={optIndex}
                                                        type="radio"
                                                        name={`quiz-${quizIndex}-question-${questionIndex}`}
                                                        label={opt}
                                                        checked={userAnswers[quizIndex] && userAnswers[quizIndex][questionIndex] === optIndex}
                                                        onChange={() => handleAnswerChange(quizIndex, questionIndex, optIndex)}
                                                    />
                                                ))}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No questions available</li>
                                    )}
                                </ul>
                            </li>
                        ))
                    ) : (
                        <li>No quizzes available</li>
                    )}
                </ul>
                <Button variant="primary" type="submit">Submit Answers</Button>
            </Form>
        </Container>
    );
};

export default CourseDetails;
