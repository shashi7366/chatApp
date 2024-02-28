import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {io} from "socket.io-client"
import { allUserRoute,host,getAllContacts } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import AddContact from "../components/AddContact";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";


import {useDispatch,useSelector} from "react-redux";
import {fetchContacts,updateUser} from "../feature/contactSlice";



function Chat() {

    const [contacts,setContacts]=useState([]);
    const [currentUser,setCurrentUser]=useState("");
    const [small,setSmall]=useState(true);
    const [currentChat,setCurrentChat]=useState(undefined);
    const [showAddContact,setShowAddContact]=useState(false);
    const navigate=useNavigate();
    const socket=useRef();

    const dispatch=useDispatch();
    // let contactsFromStore=useSelector((state)=>{
    //     return state.contacts.contactDetails;
    // });

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
            dispatch(updateUser(JSON.parse(localStorage.getItem("chat-app-user"))));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", { id: currentUser._id, name: currentUser.username });
        }
    }, [currentUser])


    useEffect(()=>{
        if(currentUser){
            if(currentUser.isAvatarImageSet){
                // fetch(`${allUserRoute}/${currentUser._id}`)
                // axios.post(getAllContacts,{
                //     contacts:currentUser.contacts
                // })
                // .then(({data})=>{
                //     setContacts(data.users);
                // })
                // .catch((error)=>{
                //     console.log("error in chat.jsx ",error.message);
                // })

                dispatch(fetchContacts(currentUser.contacts));
                //dispatch(updateContacts(contactsFromStore));

            }else{
                navigate("/setAvatar");
            }
        }
    }, [currentUser]);


    useEffect(()=>{

        if(window.innerWidth>640){
            setSmall(false);
        }else{
            setSmall(true);
        }

        function adjustChat(){
            if(window.innerWidth>640){
                setSmall(false);
            }else{
                setSmall(true);
            }
        }
        window.addEventListener("resize",adjustChat);

        return ()=>{
            window.removeEventListener("resize",adjustChat);
        }
    },[])



    const handleChatChange=(chat)=>{
       // console.log(chat);
        setCurrentChat(chat);
    }
    return <div className="min-w-full h-dvh max-h-[90%] flex flex-col justify-center gap-1 items-center bg-[#10b981] relative">
        {showAddContact && <AddContact setShowAddContact={setShowAddContact}/>}
        <div className="w-full  h-[98%] max-h-[98%] bg-white grid grid-cols-12 grid-rows-1">
            
                {!(small && currentChat) && <Contacts  currentUser={currentUser} changeChat={handleChatChange} setShowAddContact={setShowAddContact}/>}
        
           
                {currentChat && <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} changeChat={handleChatChange}/>}
            
        </div>
    </div>

}

export default Chat; 