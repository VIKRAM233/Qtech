import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;