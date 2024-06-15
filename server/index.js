const express =require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const MongoClient = require("mongodb").MongoClient;
const userRoutes = require("./routes/UserRoutes")
const app=express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
const PORT = 8080

//Connect to mongoose database server
const connect = mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Mongo Server Running on port ${PORT}`);
    });
  })
.catch((err) => console.log(err));

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started at Port ${process.env.PORT}`)
})