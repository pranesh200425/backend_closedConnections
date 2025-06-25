require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json);

const mongo = process.env.MONGO_URI;
//console.log(mongo)

const Group = New mongoose.model("Group", group);
let gID = 0;
app.post('/api/postGroup', async (req, res)=> {  
  const  groupID = gID++ ;
  try {
  const Group = await Group.create({ groupID, members });
}catch (err) {
    res.status(500).json({ message: "Server error" });
  }
})

const group = mongoose.Schema({
  groupID: { type: Number, required: true },
  members: { type: [Number], default: [] },
});

mongoose
  .connect(mongo, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
