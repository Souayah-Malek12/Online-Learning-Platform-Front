import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestChat } from "../store/chatSlice";
import { Spinner, Alert } from 'react-bootstrap'; // Import these if you want to use them for loading and error states

const Chat = () => {
    const dispatch = useDispatch();
    const { answer, isLoading, error } = useSelector((state) => state.chat);
    const [question, setQuestion] = useState("");

    // Log answer and other relevant values
    useEffect(() => {
        console.log("Answer:", answer);
        console.log("Loading:", isLoading);
        console.log("Error:", error);
    }, [answer, isLoading, error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(requestChat({ question }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="question" 
                    value={question}  
                    onChange={(e) => setQuestion(e.target.value)} // Use onChange for updating state
                />
                <button type="submit">Ask for Answer</button>
            </form>
            <div>
                {isLoading && <Spinner animation="border" />} 
                {error && <Alert variant="danger">{error}</Alert>} 
                {answer && typeof answer === 'object' && answer.success && (
                    <>
                        <h3>{answer.message}</h3> 
                        <p>{answer.data}</p> 
                    </>
                )}
                {answer && typeof answer === 'object' && !answer.success && (
                    <p>Error: {answer.message}</p>  
                )}
            </div>
        </div>
    );
};

export default Chat;
