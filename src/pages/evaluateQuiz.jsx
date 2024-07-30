import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import { submitQuiz } from '../store/quizSlice';

const EvaluateQ = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { state } = location;

    const { result, status, error } = useSelector((state) => state.quiz);

    useEffect(() => {
        if (state && state.quizResponses) {
            dispatch(submitQuiz(state.quizResponses));
        }
    }, [state, dispatch]);

    if (status === 'loading') return <Spinner animation="border" />;
    if (status === 'failed') return <Alert variant="danger">{error?.message || 'An error occurred'}</Alert>;
    if (!result) return <p>No result available</p>;

    return (
        <Container className="mt-3">
            <h1>Evaluation Result</h1>
            <p>{result.message || 'No message available'}</p>
            {result.success ? (
                <div>
                    <div>
                        <h4>Score:</h4>
                        <p>{result.score || 0}</p>
                    </div>
                    <div>
                        <h4>Percentage:</h4>
                        <p>{result.Percentage || 0}%</p>
                    </div>
                </div>
            ) : (
                <p>Evaluation failed</p>
            )}
            <Button variant="primary" onClick={() => window.history.back()}>
                Back to Course
            </Button>
        </Container>
    );
};

export default EvaluateQ;
