import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

//get the friend list of the user
export const getUserFriends = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
    
        const formattedFriends = friends.map( //proper way format for Friends for frontend
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
        } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* Update */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id); //part ni blur
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
    
        const formattedFriends = friends.map( //proper way format for Friends for frontend
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};