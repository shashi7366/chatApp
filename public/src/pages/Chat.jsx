import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";


function Chat(){

    const [contacts,setContacts]=useState([]);
    const [currentUser,setCurrentUser]=useState("");
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
    return <div className="min-w-full h-screen flex flex-col justify-center gap-1 items-center bg-[#131324]">
        <div className="w-5/6 h-5/6 bg-[#00000076] grid grid-cols-12">
            <div className="col-span-3">
                <Contacts contacts={contacts} currentUser={currentUser}/>
            </div>

            <div className="col-span-9">

            </div>
        </div>
    </div>
}

export default Chat; 