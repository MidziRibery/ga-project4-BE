import mongoose from "mongoose"; //help to set up the model


//why we do a ER diagram in the first place, to help us with arranging data here.
//what are the type of data that I need?
//Step 1, create the mongoose schema first
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    }, 
    { timestamps: true }
);

//Step 2: create the mongoose model
const User = mongoose.model("User", UserSchema);
export default User;      