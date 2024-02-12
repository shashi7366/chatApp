import {useState,useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import {io} from "socket.io-client"
import { allUserRoute,host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";



function Chat(){

    const [contacts,setContacts]=useState([]);
    const [currentUser,setCurrentUser]=useState("");
    const [currentChat,setCurrentChat]=useState(undefined);
    const navigate=useNavigate();
    const socket=useRef();

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        }else{
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        }
    },[]);

    useEffect(()=>{
        if(currentUser){
            socket.current=io(host);
            socket.current.emit("add-user",{id:currentUser._id,name:currentUser.username});
        }
    },[currentUser])


    useEffect(()=>{
        if(currentUser){
            if(currentUser.isAvatarImageSet){
                fetch(`${allUserRoute}/${currentUser._id}`)
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    setContacts(data);
                })
                .catch((error)=>{
                    console.log("error in chat.jsx ",error.message);
                })
            }else{
                navigate("/setAvatar");
            }
        }
    },[currentUser]);



    const handleChatChange=(chat)=>{
        console.log(chat);
        setCurrentChat(chat);
    }
    return <div className="min-w-full flex flex-col justify-center gap-1 items-center bg-[#10b981]  px-4 container">
        <div className="w-full  h-full bg-white grid grid-cols-12 subContainer1">
            <div className="col-span-3 relative h-full overflow-auto">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
            </div>

            <div className="col-span-9 h-full overflow-auto">
                {currentChat && <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>}
            </div>
        </div>
    </div>
}

export default Chat; 