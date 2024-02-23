import { CiCirclePlus } from "react-icons/ci";


function AddContactButton({setShowAddContact}){


    return<>
    <div className="w-full flex justify-center items-center gap-2 h-16"><button className="font-md h-full" onClick={()=>{
        setShowAddContact(pre=>{return !pre})
    }}><CiCirclePlus className="text-green-600 h-16 w-8"/></button> Add Contact</div>
    </>
}

export default AddContactButton;