import ChatInput from "./ChatInput";
import { FaArrowLeft } from "react-icons/fa";
import { addMessageRoute,getAllMessagesRoute} from "../utils/APIRoutes";
import axios from "axios";
import { useEffect,useState,useRef} from "react";




function ChatContainer({currentChat,currentUser,socket,changeChat}){

    const [messages,setMessages]=useState([]);
    const scrollRef=useRef();


    useEffect(()=>{
        setMessages([]);
        axios.post(`${getAllMessagesRoute}`,{
            from:currentUser._id,
            to:currentChat._id
        })
        .then(({data})=>{
           // console.log(data.result);
            setMessages(data.result);
        })
        .catch((err)=>{
            console.log("error occured while fetching messages");
        })
    },[currentChat]);

    useEffect(()=>{
        socket.current.on("msg-receive",(msg)=>{
           setMessages((prev)=>{
            return [...prev,{
                fromSelf:false,
                message:msg.msg
            }]
           })
            })
       
    },[]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);


    const addChat=async (msg)=>{
        let {data}=await axios.post(addMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            msg
        })

        if(data.status){
            
            setMessages((prev)=>{
                return [...messages,{fromSelf:true,message:msg}];
            });

            socket.current.emit("send-msg",{
                to:currentChat._id,
                from:currentUser._id,
                msg,
                receiver:currentChat.username
            });
        }else{
            alert("failed");
        }
    }


    return <div className="h-full col-span-12 sm:col-span-8 row-span-1 border-l-2 border-gray-600 flex flex-col pb-0 subcontainer2 relative">

        {/* chat header */}
        <div className="w-full h-[10%] grid grid-cols-12 gap-2 items-center py-3 px-4 bg-[#e2e8f0] absolute top-0">
            <FaArrowLeft onClick={()=>{
                changeChat(null);
            }}/>
            <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="current chat image"
            className="col-span-1 h-12"/>

            <h1 className="text-2xl col-span-1">{currentChat.username}</h1>
            <span className="col-span-9"></span>
            

        </div>

        {/* chat messages */}
        <div className="w-full h-full flex flex-col justify-start overflow-auto">
            {
                messages.map((message)=>{
                    return <div ref={scrollRef} className={`flex w-full ${message.fromSelf?'justify-end':'justify-start'} py-2 px-4 text-xl my-2`}>
                        <div className={`text-left shadow-md px-4 py-2 border-none rounded-md ${message.fromSelf?'bg-green-300':''}`}>{message.message}</div>
                    </div>
                })
            }
        </div>

        {/* chat input */}
        <div className="w-full">
            <ChatInput addChat={addChat}/>
        </div>
        </div>
}

export default ChatContainer;

