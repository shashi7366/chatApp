const express=require("express");

const cors=require("cors");

const mongoose=require("mongoose");

const socket=require("socket.io");

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
});

const io=socket(server,{
    cors:{
        origin:"https://automatic-doodle-7gjp7rqp4xhrwxx-5173.app.github.dev/",
    }
});

global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(data)=>{
        console.log(data.name +" is online");
        onlineUsers.set(data.id,socket.id);
    })

    socket.on("send-msg",(data)=>{
        console.log(data);
        const sendUserSocket=onlineUsers.get(data.to);
    
        if(sendUserSocket){
            console.log(data.receiver);
            socket.to(sendUserSocket).emit("msg-receive",{msg:data.msg,receiver:data.receiver})
        }
    })
});

