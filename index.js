const express = require("express");
const { json, urlencoded } = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

const userRouter = require("./routes/userRoute")
const messageRouter = require("./routes/messageRoute")
const app = express()
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(auth);

const mongoUser = process.env.MONGO_USER
const mongoPass = process.env.MONGO_PASS
const mongoDb = process.env.MONGO_DB

const mongoUrl = "mongodb+srv://"+ mongoUser +":"+mongoPass +"@cluster0.7cm2wrx.mongodb.net/"+mongoDb+""
mongoose.connect(mongoUrl, (err) => {
    if (err) console.log(err);
    console.log("DB connected")
})


app.use("/users", userRouter)

app.use("/messages", messageRouter)








app.listen(4000, () => console.log("server running at 4000"))