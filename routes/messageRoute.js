const { Router } = require("express");

const messageRouter = new Router();
const { sendMessage, getMessage, getMessages, UpdateMessage,deleteMessage } = require("../controller/messageController")
messageRouter.post("/send", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await sendMessage(req)
            res.send(response)
            res.end()
        } catch (error) {
            res.send({ err: error.message })
            res.end()

        }

    }
    else {

        res.send({ err: "Please Login !!!" })
        res.end()
    }
})

messageRouter.get("/messages", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await getMessages(req)
            res.send(response)
            res.end()
        } catch (error) {
            res.send({ err: error.message })
            res.end()

        }

    }
    else {

        res.send({ err: "Please Login !!!" })
        res.end()
    }

})

messageRouter.get("/:messageId", async (req, res) => {
    if (req.isAuth) {
        try {
            const response = await getMessage(req)
            res.send(response)
            res.end()
        } catch (error) {
            res.send({ err: error.message })
            res.end()

        }

    }
    else {

        res.send({ err: "Please Login !!!" })
        res.end()
    }

})

messageRouter.delete("/:messageId", async (req, res) => {

    if (req.isAuth) {
        try {
            const response = await deleteMessage(req)
            res.send(response)
            res.end()
        } catch (error) {
            res.send({ err: error.message })
            res.end()

        }
    }
    else {

        res.send({ err: "Please Login !!!" })
        res.end()
    }
})

messageRouter.put("/:messageId", async (req, res) => {

    if (req.isAuth) {
        try {
            const response = await UpdateMessage(req)
            res.send(response)
            res.end()
        } catch (error) {
            res.send({ err: error.message })
            res.end()

        }
    }
    else {

        res.send({ err: "Please Login !!!" })
        res.end()
    }
})



module.exports = messageRouter;