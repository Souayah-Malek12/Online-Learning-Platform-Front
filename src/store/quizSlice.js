import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    result: null,
    status: 'idle', // or 'loading', 'succeeded', 'failed'
    error: null,
};

// Create an async thunk for submitting the quiz
export const submitQuiz = createAsyncThunk(
    'quiz/submitQuiz',
    async (quizResponses, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/quizzes/evaluatequiz`,
                { quizResponses }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to submit quiz');
        }
    }
);

// Create the slice
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitQuiz.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitQuiz.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
                state.error = null;
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Export the reducer to be used in the store
export default quizSlice.reducer;
