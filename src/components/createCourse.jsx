import  { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Form, Container, Button, Spinner } from 'react-bootstrap';
import { requestCreatingCourse } from '../store/courseSlice';

const CreateCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.course.isLoading);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videos, setVideos] = useState("");
    const [quizzes, setQuizzes] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            title,
            description,
            videos: videos.split(',').map(url => url.trim()), // Convert to array and trim spaces
            quizzes: quizzes.split(',').map(id => id.trim()) 
        };
        dispatch(requestCreatingCourse({ formData, navigate }));
    }

    return (
        <Container className="mt-3">
            <h1>Create New Course</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Videos (Comma separated URLs)</Form.Label>
                    <Form.Control
                        name="videos"
                        value={videos}
                        onChange={e => setVideos(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quizzes (Comma separated IDs)</Form.Label>
                    <Form.Control
                        name="quizzes"
                        value={quizzes}
                        onChange={e => setQuizzes(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" className="mx-auto d-block w-100" disabled={isLoading}>
                    {isLoading ? <Spinner size="sm" /> : <span>Add Course</span>}
                </Button>

            </Form>
        </Container>
    );
}

export default CreateCourse;
