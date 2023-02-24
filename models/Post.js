import mongoose from "mongoose"; //to help setup the model

//Step 1: Create mongoose schema
const postSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: { //if one likes it, it will add to the map. If unlikes, remove from the Map.
            type: Map, //check if the userID exists in the map.
            of: Boolean, //value will be true always if it exists
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
);

//Step 2: Create mongoose model
const Post = mongoose.model("Post", postSchema);
export default Post;

