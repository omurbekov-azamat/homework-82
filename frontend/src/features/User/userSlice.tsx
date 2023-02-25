import {GlobalError, User, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {register} from "./userThunks";

interface UserState {
    user: User | null,
    registerLoading: boolean;
    registerError: ValidationError | null;
    userTakenError: GlobalError | null;
}

const initialState: UserState = {
    user: null,
    registerLoading: false,
    registerError: null,
    userTakenError: null,
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
    },
});

export const usersReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectUserTakenError = (state: RootState) => state.users.userTakenError;