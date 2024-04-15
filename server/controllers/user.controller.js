import Message from "../models/message.model.js"
import User from "../models/user.model.js"

const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const allUsers =  await User.find(
            {
                _id: { $ne: loggedInUser}
            }
        ).select("-password");

        res.status(200).json(allUsers);

    } catch (error) {
        console.log("Error in user controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export default getUsers;