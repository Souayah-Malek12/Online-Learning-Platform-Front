import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Spinner, Alert } from 'react-bootstrap';
import { fetchCourses } from "../store/courseSlice";
import CourseS from "../components/CourseS";

function GetCourses() {
    const dispatch = useDispatch();
    const { courses, isLoading, error } = useSelector(state => state.course);
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
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Courses</h1>
            <div className="flex flex-wrap justify-center gap-6">
                <CourseS courses={filteredCourses} />
            </div>
        </div>
    );
}

export default GetCourses;
