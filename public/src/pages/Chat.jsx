import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client"
import { allUserRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";



function Chat() {

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [currentChat, setCurrentChat] = useState(undefined);
    const navigate = useNavigate();
    const socket = useRef();

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", { id: currentUser._id, name: currentUser.username });
        }
    }, [currentUser])


    useEffect(() => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                fetch(`${allUserRoute}/${currentUser._id}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        setContacts(data);
                    })
                    .catch((error) => {
                        console.log("error in chat.jsx ", error.message);
                    })
            } else {
                navigate("/setAvatar");
            }
        }
    }, [currentUser]);



    const handleChatChange = (chat) => {
        console.log(chat);
        setCurrentChat(chat);
    }
    return <div className="w-full bg-white grid grid-cols-12 overflow-auto">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {currentChat && <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />}
    </div>

}

export default Chat; 