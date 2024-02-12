import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";


function Chat(){

    const [contacts,setContacts]=useState([]);
    const [currentUser,setCurrentUser]=useState("");
    const [currentChat,setCurrentChat]=useState(undefined);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        }else{
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        }
    },[]);


    useEffect(()=>{
        if(currentUser){
            if(currentUser.isAvatarImageSet){
                fetch(`${allUserRoute}/${currentUser._id}`)
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    setContacts(data);
                    console.log(data);
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
    return <div className="min-w-full h-screen flex flex-col justify-center gap-1 items-center bg-[#10b981]">
        <div className="w-full h-[90%] bg-white grid grid-cols-12 row-span-10">
            <div className="col-span-3 relative h-full overflow-hidden">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
            </div>

            <div className="col-span-9 h-full">
                {currentChat && <ChatContainer currentChat={currentChat} currentUser={currentUser}/>}
            </div>
        </div>
    </div>
}

export default Chat; 