import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Alert } from 'react-bootstrap';
import { fetchCourses } from "../store/courseSlice";
import { Link } from 'react-router-dom';
import CourseS from "../components/CourseS";

function GetCourses() {
    const dispatch = useDispatch();
    const { courses, isLoading, error } = useSelector(state => state.course);
    const [viewMode, setViewMode] = useState("grid"); // or "list" depending on your default
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    useEffect(() => {
        if (courses) {
            setFilteredCourses(courses); // You can apply any filtering logic here
        }
    }, [courses]);

    if (isLoading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-3">
            <h1>Courses</h1>
            
            {/* Add your search and view mode controls here */}

            <div className={viewMode === "grid" ? "d-flex flex-wrap" : ""}>
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                    
                        <div>
                            <CourseS key={course._id} props={course.title, course.description, course._id} />
                        </div>
                    ))
                ) : (
                    <p>No courses found</p>
                )}
            </div>
        </Container>
    );
}

export default GetCourses;
