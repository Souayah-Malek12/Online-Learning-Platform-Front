import  { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
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
        const preparedVideos = videos.split(',').map(url => url.trim());
        const preparedQuizzes = quizzes ? quizzes.split(',').map(id => id.trim()).filter(id => id) : [];

        const payload = { title, description, videos: preparedVideos, quizzes: preparedQuizzes };

        console.log("Request Payload:", payload); // Log the request payload for debugging

        dispatch(requestCreatingCourse( payload ))
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error("Failed to create course: ", error);
            });
    }

    return (
        <div className="container mx-auto mt-12">
            <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">

                 <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            rows={3}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Videos (Comma separated URLs)</label>
          <input
            type="text"
            name="videos"
            value={videos}
            onChange={(e) => setVideos(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Quizzes (Comma separated IDs)</label>
          <input
            type="text"
            name="quizzes"
            value={quizzes}
            onChange={(e) => setQuizzes(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner-border spinner-border-sm"></span> : 'Add Course'}
        </button>

      </form>
    </div>
    );
}

export default CreateCourse;
