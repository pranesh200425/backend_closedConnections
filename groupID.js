require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mongo = process.env.MONGO_URI;
//console.log(mongo)

const groupschema = mongoose.Schema({
  groupID: { type: Number, required: true },
  members: { type: [Number] },
});

const Group = new mongoose.model("Group", groupschema);
let gID = 0;
app.post('/api/postGroup', async (req, res)=> {  
  let groupID = 0;
  const members = [];
  try {
    for(let i = 0; i < 100; i++) {
  const GroupDoc = await Group.create({ groupID, members });
  groupID++;
    }
  res.status(201).json({message: "Group created successfully"});
  
}catch (err) { 
    res.status(500).json({ message: "Server error" });
  }
})

app.get('/api/getGroup', async (req, res) => {
  const groupId = Math.floor(Math.random() * 100);
  try {
    const group = await Group.findOne({ members: groupId });
    console.log(group, groupId);
    res.status(200).json({group});
  } catch (err) {
    res.status(500).json({ message: err });
  }
})

mongoose
  .connect(mongo, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})