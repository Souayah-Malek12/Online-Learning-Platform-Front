import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner, Alert, Form, Button } from 'react-bootstrap';
import { fetchCourseDetails } from "../store/courseSlice";

const CourseDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { course, isLoading, error } = useSelector(state => state.course);

    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        if (id) {
            dispatch(fetchCourseDetails(id));
        }
    }, [dispatch, id]);

    const getYouTubeVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^"&?\/\s]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/.*\/\w+\/|.*\/\w+\/|.*\/|watch\/)?([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] || match[2] : null;
    };
    

    const handleAnswerChange = (quizIndex, questionIndex, answerIndex) => {
        const updatedAnswers = [...userAnswers];
        if (!updatedAnswers[quizIndex]) {
            updatedAnswers[quizIndex] = [];
        }
        updatedAnswers[quizIndex][questionIndex] = answerIndex;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const quizResponses = course.quizzes.map((quiz, quizIndex) => ({
            quizIndex: quizIndex,
            userAnswers: userAnswers[quizIndex] || []
        }));
        navigate('/evaluateQ', { state: { quizResponses } });
    };

    if (isLoading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">An error occurred: {error.message}</Alert>;
    if (!course) return <p>No course data available</p>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-4">{course.title || 'No title available'}</h1>
                <p className="text-lg mb-6">{course.description || 'No description available'}</p>
                
                <div className="mb-6">
    <h3 className="text-2xl font-semibold mb-2">Videos:</h3>
    <ul className="list-none p-0">
        {course.videos && course.videos.length > 0 ? (
            course.videos.map((video, index) => {
                const videoId = getYouTubeVideoId(video);
                return videoId ? (
                    <li key={index} className="mb-4">
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`} // Use embed URL format
                            title={`YouTube video player ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg shadow-md"
                        ></iframe>
                    </li>
                ) : (
                    <li key={index} className="text-red-500">Invalid video URL</li>
                );
            })
        ) : (
            <li>No videos available</li>
        )}
    </ul>
</div>

                <div>
                    <h3 className="text-2xl font-semibold mb-4">Quizzes:</h3>
                    <Form onSubmit={handleSubmit} className="space-y-4">
                        <ul className="space-y-4">
                            {course.quizzes && course.quizzes.length > 0 ? (
                                course.quizzes.map((quiz, quizIndex) => (
                                    <li key={quiz._id} className="border-b pb-4">
                                        <h4 className="text-xl font-semibold mb-2">Quiz {quizIndex + 1}</h4>
                                        <ul className="space-y-2">
                                            {quiz.questions && quiz.questions.length > 0 ? (
                                                quiz.questions.map((q, questionIndex) => (
                                                    <li key={q._id}>
                                                        <h5 className="font-medium mb-1">{q.question}</h5>
                                                        {q.options.map((opt, optIndex) => (
                                                            <Form.Check
                                                                key={optIndex}
                                                                type="radio"
                                                                name={`quiz-${quizIndex}-question-${questionIndex}`}
                                                                label={opt}
                                                                checked={userAnswers[quizIndex] && userAnswers[quizIndex][questionIndex] === optIndex}
                                                                onChange={() => handleAnswerChange(quizIndex, questionIndex, optIndex)}
                                                                className="mb-1"
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
                        <Button variant="primary" type="submit" className="mt-4">Submit Answers</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
