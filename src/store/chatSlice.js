import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the async thunk
export const requestChat = createAsyncThunk(
    '/chat/askChat',
    async ({ question }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")
            // Make sure to include the question in the request payload if necessary
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/chatbot/chat`, 
                { question } , {
                    headers : {
                        Authorization : token
                    }
                }
            );
            return res.data;
        } catch (error) {
            // Extract and return the error message
            return rejectWithValue(error.response?.data || 'Failed to fetch chat response');
        }
    }
);

// Define the slice
const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        answer: null,
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestChat.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(requestChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.answer = action.payload;
                state.error = null;
            })
            .addCase(requestChat.rejected, (state, action) => {
                state.isLoading = false;
                state.answer = null;
                state.error = action.payload;
            });
    }
});

export default chatSlice.reducer;
