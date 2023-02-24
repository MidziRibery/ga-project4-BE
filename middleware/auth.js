import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization"); // from the request in the frontend will be setting this in the header and this is where we can grab it.

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) { //we want the token to start with "Bearer "
            token = token.slice(7, token.length).trimLeft(); //how we are grabbing the actual token, by removing the Bearer with space onwards
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};