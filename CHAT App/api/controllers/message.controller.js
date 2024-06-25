import Message from "../models/message.js";
import getUserData from "../utils/getUserData.js";

export const getMessages = async (req, res) => {
  const { id } = req.params;
  const userData = await getUserData(req);
  const ourUserId = userData.id;
  const messages = await Message.find({
    sender: { $in: [id, ourUserId] },
    recipient: { $in: [id, ourUserId] },
  }).sort({ createdAt: 1 });
  res.json(messages);
};
