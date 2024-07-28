import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { extractErrorMessage, alertError, alertSuccess } from '../utilities/feedBack'; // Ensure you have this function correctly imported


export const fetchCourseDetails = createAsyncThunk(
    'course/fetchCourseDetails  ',
    async (id, { rejectWithValue }) => {    
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/getcourseById/${id}`);
            return res.data.course;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch course details');
        }
    }
);

export const fetchCourses = createAsyncThunk('/courses/fectchCourses',
    async(_,{rejectWithValue})=> {
        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/getcourse`);
            return res.data.courses;
        }catch(error){
            return rejectWithValue(error.response.data);

        }
    }
 )



export const requestCreatingCourse = createAsyncThunk(
    'courses/requestCreatingCourse',
    async({ formData, navigate }, { rejectWithValue }) => {
        try {
            // const token = localStorage.getItem('token');
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/courses/create`,
                formData,
                // {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //         Authorization: `Bearer ${token}`
                //     }
                // }
            );
            // Use navigate here for successful navigation
            navigate('/');
            return res.data; // Return the response data to update the state
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            return rejectWithValue(errorMessage);
        }
    }
);
export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: [],
        course: null,
        isLoading: false,
        error: null
    },
    reducers: { },
    extraReducers: (builder) => {
        builder
        .addCase(requestCreatingCourse.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(requestCreatingCourse.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Failed to create course'; 
            alertError(state.error);
        })
        .addCase(requestCreatingCourse.fulfilled, (state, action) => {
            state.isLoading = false;
            alertSuccess(action.payload.message);
            state.courses.push(action.payload.course);
        })
        .addCase(fetchCourses.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCourses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.courses = action.payload;
        })
        .addCase(fetchCourses.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Failed to fetch courses';
        })
        .addCase(fetchCourseDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCourseDetails.fulfilled, (state, action) => {
            console.log('Fetched course details:', action.payload);
            state.isLoading = false;
            state.course = action.payload;
        })
        .addCase(fetchCourseDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Failed to fetch course details';
        })
    }
});

export default courseSlice.reducer;