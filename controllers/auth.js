import bcrypt from "bcrypt"; // encrypting our password
import jwt from "jsonwebtoken"; // a way to send users a webtoken for authorization
import User from "../models/User.js"

/* Register User */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt= await bcrypt.genSalt(); // provide random salt by bcrypt
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message }); // to send this if there is an error
    }
};

/* Logging In - Gives token/validation that users can use to sign in */ 
export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. "}); //to validate correct email

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.satus(400).json({ msg: "Invalid credentials. "}); //to validate correct password

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
        delete user.password;// to ensure this does not get send to the front end
        res.status(200).json({ token, user});
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};