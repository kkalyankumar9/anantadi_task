const express =require("express");
const { connection } = require("./db");
const { userAuthRouter } = require("./routes/authRoute");
const cors = require("cors");

const { videosUploadRouter } = require("./routes/uploadVideosRouter");
const { videosListRouter } = require("./routes/getVideos");
const app = express()

app.use(cors());

require("dotenv").config()
// Serve static files (uploaded videos)
app.use("/uploads/videos", express.static("uploads/videos"));


app.use(express.json())

app.use("/auth",userAuthRouter)
app.use("/upload",videosUploadRouter)
app.use("/videos",videosListRouter)


app.listen(8000, async () => {
    try {
      await connection;
  
      console.log(`Connected to the database 8000`);
    } catch (error) {
      console.error(error);
    }
  });