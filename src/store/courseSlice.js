import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { extractErrorMessage, alertError, alertSuccess } from '../utilities/feedBack'; // Assurez-vous que ces fonctions sont correctement importées

// Thunk pour récupérer les détails d'un cours
export const fetchCourseDetails = createAsyncThunk(
    'course/fetchCourseDetails',
    async (id, { rejectWithValue }) => {    
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/getcourseById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data.course;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch course details');
        }
    }
);

// Thunk pour récupérer la liste des cours
export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/getcourse`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return res.data.courses;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch courses');
        }
    }
);

export const requestCreatingCourse = createAsyncThunk(
    'courses/requestCreatingCourse',
    async ( payload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/courses/create`,
                 payload ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data; 
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            return rejectWithValue(errorMessage);
        }
    }
);
// Slice pour gérer les cours
export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: [],
        course: null,
        isLoading: false,
        error: null
    },
    reducers: {},
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
                state.isLoading = false;
                state.course = action.payload;
            })
            .addCase(fetchCourseDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch course details';
            });
    }
});

export default courseSlice.reducer;
