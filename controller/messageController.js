const messageModel = require("../models/messageModel");
const userModel = require("../models/usermodel");

exports.sendMessage = async (data) => {

    try {
        const { receivedId } = data.params;
        const { message } = data.body;
        const newMessage = await messageModal.create({

            message,
            receiver: receivedId,
            sender: data.userId,
            createdAt: new Date(),
            updateAt: new Date(),

        })
        const { _id: messageId } = newMessage;
        const updatedReceiver = await userModel.findByIdAndUpdate({
            $push: {
                receivedMessage: messageId
            }
        });
        const updateSender = await userModel.findByIdAndUpdate({

            $push: {
                sentMessages: messageId
            }
        });
        return newMessage;

    } catch (error) {
        res.send({ err: error.message })

    }

}


exports.getMessages = async (data) => {
    try {
        const { receivedMessage: rm, sentMessages: sm } = await userModel.findById(data.userId);
        const receivedMessagesPromises = rm.map(e => {
            return messageModel.findById(e)

        });
        const receivedMessages = await Promise.all(receivedMessagesPromises);
        const sentMessages = [];
        for (const id of sm) {

            const sentData = await messageModel.findById(id)
            sentMessages.push(sentData)
        }
        return (
            sentMessages,
            receivedMessages

        )
    } catch (error) {
        res.send({ err: error.message })

    }



}


exports.getMessage = async (data) => {
    try {
        const { messageId } = data.params
        const msgData = await messageModel.findById(messageId)
        return msgData
    } catch (error) {
        res.send({ err: error.message })

    }


}


exports.UpdateMessage = async (data) => {

    try {
        const { messageId } = data.params
        const msgData = await messageModel.findByIdAndUpdate(messageId, { message: data.body.message, updateAt: new date() }, { new: true })
    } catch (error) {
        res.send({ err: error.message })

    }


}


exports.deleteMessage = async (data) => {

    try {
        const { messageId } = data.params;
        const { userId } = data
        const msgData = await messageModel.findById(messageId);

        if (userId === receiver) {

            const updatedUser = await userModel.findByIdAndUpdate(userId, { $pull: { receivedMessages: messageId } })
            return ({msg:"Message deleted sucessfully"})

        }
        if (userId === sender) {

            const updatedSender = await userModel.findByIdAndUpdate(userId, { $pull: { sentMessages: messageId } })
            const updatedReceiver = await userModel.findByIdAndUpdate(receiver, { $pull: { receivedMessages: messageId } })

            const deleteMsg=messageModel.findOneAndDelete(messageId)
            const result = await Promise.all([updateSender,updatedReceiver,this.deleteMessage])
            return ({msg:"Message deleted sucessfully"})

        }


        return ({ err: "invalid messageId provided" })

    } catch (error) {
        res.send({ err: error.message })

    }

}