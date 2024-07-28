import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Alert } from 'react-bootstrap';
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
                        <label htmlFor="score">Score:</label>
                        <input
                            type="number"
                            id="score"
                            value={result.score || 0}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="percentage">Percentage:</label>
                        <input
                            type="number"
                            id="percentage"
                            value={result.Percentage || 0}
                            readOnly
                        />
                    </div>
                </div>
            ) : (
                <p>Evaluation failed</p>
            )}
        </Container>
    );
};

export default EvaluateQ;
