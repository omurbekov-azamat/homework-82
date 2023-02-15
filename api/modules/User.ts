import {model, Schema} from "mongoose";
import {IUser} from "../types";

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = model('User', UserSchema);
export default User;