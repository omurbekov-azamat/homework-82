import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {GlobalError, RegisterMutation, RegisterResponse, User, ValidationError} from "../../types";

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError | GlobalError}>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            if (isAxiosError(e) && e.response && e.response.status === 500 && e.response.statusText === 'Internal Server Error') {
                const error: GlobalError = {
                    error: 'That username is taken. Try another.',
                };
                return rejectWithValue(error as GlobalError);
            }
            throw e;
        }
    }
);