import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import courseReducer from './courseSlice';
import quizReducer from './quizSlice'

export const store = configureStore({
    reducer : {
        user : userReducer,
        course : courseReducer,
        quiz: quizReducer
    }
});