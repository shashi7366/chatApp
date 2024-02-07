import { useEffect, useState} from "react"

export default function Contacts({contacts,currentUser}){

    const [currentUserName,setCurrentUserName]=useState(undefined);
    const [currentUserImage,setCurrentUserImage]=useState(undefined);
    const [currentlySelected,setCurrentlySelected]=useState(undefined);

    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    },[currentUser]);

    const changeCurrentChat=(index,contact)=>{}


    return <div>
        
        </div>
}