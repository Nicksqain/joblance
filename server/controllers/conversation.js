import Conversation from "../models/conversation";
import Message from "../models/message";

export const message = async (req, res) => {
  const newConversartion = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const exist = await Conversation.findOne({
      members: { $in: [[req.body.senderId, req.body.receiverId]] },
    });
    if (exist) {
      return res.json({
        error: "the dialogue has already been created",
      });
    } else {
      const savedConversation = await newConversartion.save();
      res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getConv = async (req, res) => {
  try {
    // ОПТИМИЗИРОВАТЬ
    let allMessages = await Message.find({}).sort({ createdAt: 1 });
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).sort({ createdAt: -1 });
    conversations.map((conv) => {
      allMessages.map((msg) => {
        if (conv._id.toString() == msg.conversationId) {
          conv.lastmessage = msg.body;
        }
      });
    });

    res.status(200).json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
export const addMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
