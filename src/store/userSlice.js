import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { alertError, alertSuccess, extractErrorMessage } from '../utilities/feedBack';

// Define the async thunk for login
export const requestLogin = createAsyncThunk('user/requestLogin', async ({ email, motDePasse, role }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, motDePasse, role },
            {
                headers : {
                    Authorization : token
                }
            }
        );
        return res.data;
    } catch (error) {
        const errorMessage = extractErrorMessage(error);
        return rejectWithValue(errorMessage);
    }
});

export const requestRegistre = createAsyncThunk('user/requestRegistre', async({nom, prenom, role, email, etablissement, motDePasse, adresse, phone, navigate}, {rejectWithValue})=> {
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/registre`, {nom, prenom, role, email, etablissement, motDePasse, adresse, phone}, {rejectWithValue} )
        navigate('/login')
        return res.data
    }catch(error){
        const errorMessage = extractErrorMessage(error)
        return rejectWithValue(errorMessage)
    }
});

// Define the user slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        token: null,
        details: null,
        isLoading: false,
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.details = action.payload.details;
        }
    },logout: (state) => {
        localStorage.removeItem('token')
        localStorage.removeItem('userDetails')
        state.isAuthenticated = false
        state.token = null
        state.details = null
      },
    extraReducers: (builder) => {
        builder
            .addCase(requestLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(requestLogin.rejected, (state, action) => {
                state.isLoading = false;
                const errorMsg = action.payload;
                alertError(errorMsg);
                state.error = errorMsg;
            })
            .addCase(requestLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                const { token, user, message } = action.payload;
                state.token = token;
                state.details = user;
                localStorage.setItem('token', token);
                localStorage.setItem('userDetails', JSON.stringify(user));
                alertSuccess(message);
            })
            .addCase(requestRegistre.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(requestRegistre.rejected, (state, action)=> {
                state.isLoading = false
                const errorMessage = action.payload
                alertError(errorMessage)
                state.error = errorMessage
            } )
            .addCase(requestRegistre.fulfilled, (state, action)=> {
                state.isLoading = false
                alertSuccess(action.payload.message)
            })
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
