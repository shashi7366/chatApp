import ChatInput from "./ChatInput";
import { FaArrowLeft } from "react-icons/fa";
import { addMessageRoute,getAllMessagesRoute} from "../utils/APIRoutes";
import axios from "axios";
import { useEffect,useState,useRef} from "react";
import Message from "./Message";




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
          //  console.log(data.result);
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

    let prev;

    return <div className="h-full max-h-[90%] col-span-12 sm:col-span-8 row-span-1 border-l-2 border-gray-600 flex flex-col justify-between pb-0 subcontainer2 relative">

        {/* chat header */}
        <div className="w-full h-[10%] grid grid-cols-12 gap-2 items-center py-3 px-4 bg-[#e2e8f0]">
            <FaArrowLeft onClick={()=>{
                changeChat(null);
            }}/>
            <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="current chat image"
            className="col-span-2 sm:col-span-1 h-12"/>

            <h1 className="text-2xl col-span-1">{currentChat.username}</h1>
            <span className="col-span-8"></span>
            

        </div>

        {/* chat messages */}
        <div className="w-full h-[90%] max-h-[90%] min-h-[90%] flex flex-col justify-start overflow-auto">
            {
                messages.map((message)=>{
                    let flag=1;
                    if(prev!=message.date){
                        flag=0;
                        prev=message.date;
                    }
                    return <>
                    {
                        flag?null:<div className="flex justify-center text-gray-400 font-thin font-sm my-4"><p className="bg-amber-100">{message.date}</p></div>
                    }
                    <div ref={scrollRef} className={`flex w-full ${message.fromSelf?'justify-end':'justify-start'} py-2 px-4 text-xl my-2`}>
                        {/* <div className={`text-left shadow-md px-4 py-2 border-none rounded-md ${message.fromSelf?'bg-green-300':''}`}>{message.message}</div> */}
                        <Message message={message.message} 
                        image={message.fromSelf?currentUser.avatarImage:currentChat.avatarImage}
                        align={message.fromSelf?'right':'left'}
                        time={message.time}
                        />
                    </div>
                    </>
                })
            }
        </div>

        {/* chat input */}
        
            <ChatInput addChat={addChat}/>
        
        </div>
}

export default ChatContainer;

