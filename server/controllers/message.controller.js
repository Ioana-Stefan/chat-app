import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiver_id} = req.params;
        const sender_id = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [sender_id, receiver_id]}
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [sender_id, receiver_id]
            })
        }

        const newMessage = new Message({
            senderId: sender_id,
            receiverId: receiver_id,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // Optimised version to run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const  {id: userToChatId} = req.params;
        const sender_id = req.user._id;

        const conversation = await Conversation.findOne(
            {
                participants: {$all:[sender_id, userToChatId]}
            }
        ).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}