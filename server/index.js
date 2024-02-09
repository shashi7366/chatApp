const express=require("express");

const cors=require("cors");

const mongoose=require("mongoose");

const userRoutes=require("./routes/userRoutes");

const messageRouter=require("./routes/messageRoutes");

const app=express();
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/msg",messageRouter);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("db connection successful");
}).catch((error)=>{
    console.log(error.message);
});

const server=app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
})