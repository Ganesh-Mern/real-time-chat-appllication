import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in message sending controller ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userChatId } = req.params;
    const senderId = req.user._id;

    const conversation= await Conversation.findOne({
        participants:{$all:[senderId,userChatId]}
    }).populate("messages")

    const messages=conversation.messages

    res.status(200).json(messages)


    if(!conversation) return res.status(200).json([])
  } catch (error) {
    console.log("error in getMessage  controller ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
