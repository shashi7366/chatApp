import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { addMessageRoute,getAllMessagesRoute} from "../utils/APIRoutes";
import axios from "axios";
import { useEffect,useState } from "react";



function ChatContainer({currentChat,currentUser}){

    const [messages,setMessages]=useState([]);


    useEffect(()=>{
        axios.post(`${getAllMessagesRoute}`,{
            from:currentUser._id,
            to:currentChat._id
        })
        .then(({data})=>{
            console.log(data.result);
            setMessages(data.result);
        })
        .catch((err)=>{
            console.log("error occured while fetching messages");
        })
    },[currentChat]);


    const addChat=async (msg)=>{
        let {data}=await axios.post(addMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            msg
        })

        if(data.status){
            alert("success");
        }else{
            alert("failed");
        }
    }


    return <div className="w-full grid grid-rows-12 border-l-2 border-gray-600 h-full relative">

        {/* chat header */}
        <div className="w-full grid grid-cols-12 gap-2 items-center py-3 px-4 bg-[#e2e8f0] row-span-1">
            <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="current chat image"
            className="col-span-1 h-12"/>

            <h1 className="text-2xl col-span-1">{currentChat.username}</h1>
            <span className="col-span-9"></span>
            <div className="col-span-1"><Logout/></div>

        </div>

        {/* chat messages */}
        <div className="w-full flex flex-col justify-start row-span-10">
            {
                messages.map((message)=>{
                    return <div className={`flex w-full ${message.fromSelf?'justify-end':'justify-start'} py-2 px-4 text-xl`}>
                        {message.message}
                    </div>
                })
            }
        </div>

        {/* chat input */}
        <div className="w-full row-span-1">
            <ChatInput addChat={addChat}/>
        </div>
        </div>
}

export default ChatContainer;

