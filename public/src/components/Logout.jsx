import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BiPowerOff} from "react-icons/bi"

function Logout(){

    const naviagte=useNavigate();

    const handleClick=async ()=>{
        localStorage.clear();
        naviagte("/login");
    }

    return <button onClick={()=>{handleClick()}}><BiPowerOff className="w-full h-8 text-red-600"/></button>
}

export default Logout;