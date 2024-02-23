import { useEffect, useState } from "react";
import Logout from "./Logout";
import AddContactButton from "./AddContactButton";

export default function Contacts({ contacts, currentUser,changeChat,setShowAddContact}) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentlySelected, setCurrentlySelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => { }


    return  <div className="w-full h-full max-h-full row-span-1 col-span-12 sm:col-span-4 overflow-auto relative">

            {/* currentUser div */}
            <div className="w-full grid grid-cols-6 p-2 bg-[#e2e8f0] sticky top-0 items-center">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="current user image" className="col-span-1" />
                <span className="col-span-4"></span>
                <div className="col-span-1"><Logout/></div>
            </div>

            <AddContactButton setShowAddContact={setShowAddContact}/>
            {/* All contacts */}

            <div className="">
                {
                    contacts.map((contact,index) => {
                        return <div className={`w-full grid grid-cols-6 py-2 px-4 gap-4 items-center border border-b-2 ${currentlySelected==index?"bg-[#f3f4f6]":"bg-white"} hover:bg-gray-100 h-[10%]`}
                        onClick={()=>{setCurrentlySelected(index);changeChat(contact)}}>
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="contact's image" className="col-span-1" />
                            <h2 className="text-xl">{contact.username}</h2>
                        </div>
                    })
                }
            </div>
        </div>
    
}