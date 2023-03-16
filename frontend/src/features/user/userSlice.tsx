import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {googleLogin, login, logout, register} from "./userThunks";
import {GlobalError, User, ValidationError} from "../../types";

interface UserState {
    user: User | null,
    registerLoading: boolean;
    registerError: ValidationError | null;
    userTakenError: GlobalError | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
    logoutLoading: boolean;
}

const initialState: UserState = {
    user: null,
    registerLoading: false,
    registerError: null,
    userTakenError: null,
    loginLoading: false,
    loginError: null,
    logoutLoading: false,
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerError = null;
            state.registerLoading = true;
        });
        builder.addCase(register.fulfilled, (state, {payload: user}) => {
            state.registerLoading = false;
            state.user = user;
        });
        builder.addCase(register.rejected, (state, {payload: error}) => {
            state.registerLoading = false;
            if (error) {
                if (error.hasOwnProperty('error')) {
                    state.userTakenError = error as GlobalError;
                }
                if (error.hasOwnProperty('errors')) {
                    state.registerError = error as ValidationError;
                }
            }
        });
        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
        builder.addCase(logout.pending, (state) => {
            state.user = null;
            state.logoutLoading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.logoutLoading = false;
        });
        builder.addCase(logout.rejected, (state) => {
            state.logoutLoading = false;
        });
        builder.addCase(googleLogin.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(googleLogin.fulfilled, (state, {payload: user}) => {
            state.loginLoading = false;
            state.user = user;
        });
        builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
    },
});

export const usersReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectUserTakenError = (state: RootState) => state.users.userTakenError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;