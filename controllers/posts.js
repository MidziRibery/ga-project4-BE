import Post from "../models/Post.js";
import User from "../models/User.js";

//what functions we want

/* CREATE function */
export const createPost = async (req, res) => {
    try {
        const { userId: userID, description, picturePath } = req.body; // things that frontend is going to send. in this case the user that is sending it plus the picture url.
        const user = await User.findById(userID); //grab the user information
        const newPost = new Post({ //create new post into the database
            userID,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save(); //to ensure it is saved into mongoDB

        const post = await Post.find(); // to ensure we grab ALL the post
        res.status(201).json(post); // to return the post to the frontEnd and has the list of the updated post
        //201 is creating something
    } catch(err) {
        console.error(err);
        res.status(409).json({ message: err.message})
    }
};


/* READ function aka grabbing the newsfeed */ 
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); 
        res.status(200).json(post); //200 is a succesful request
    } catch (err) {
        res.status(404).json({ message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId: userID } = req.params;
        const post = await Post.find({ userID }); //will only find the user feed post
        res.status(200).json(post); // send the post back
    } catch (err) {
        res.status(404).json({ message: err.message})    
    }
}
/* UPDATE function */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params; //id comes from query string
        const { userId: userID } = req.body; //userId comes from the body of the request
        const post = await Post.findById(id); //this is the post
        const isLiked = post.likes.get(userID);//to check in the likes if the userId exists. If the userId exists, means that post has been liked by that particular person
        
        if (isLiked) {
            post.likes.delete(userID); //delete from object list if already exists
        } else {
            post.likes.set(userID, true); //adds if not
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes }, //pass in likes to the new post
            { new: true } 
        );

        res.status(200).json(updatedPost);//update the frontEnd once user get the like button
    } catch (err) {
        res.status(404).json({ message: err.message})
    } 
}

