import { useEffect, useState } from "react"

export default function Contacts({ contacts, currentUser,changeChat }) {

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


    return  <div className="w-full h-full overflow-auto relative">

            {/* currentUser div */}
            <div className="w-full grid grid-cols-6 p-2 bg-[#e2e8f0] sticky top-0">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="current user image" className="col-span-1" />
            </div>

            {/* All contacts */}

            <div className="">
                {
                    contacts.map((contact,index) => {
                        return <div className={`w-full grid grid-cols-6 py-2 px-4 gap-4 items-center border border-b-2 ${currentlySelected==index?"bg-[#f3f4f6]":"bg-white"}`}
                        onClick={()=>{setCurrentlySelected(index);changeChat(contact)}}>
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="contact's image" className="col-span-1" />
                            <h2 className="text-xl">{contact.username}</h2>
                        </div>
                    })
                }
            </div>
        </div>
    
}