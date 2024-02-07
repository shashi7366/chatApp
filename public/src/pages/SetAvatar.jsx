import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

import {Buffer} from "buffer";

function SetAvatar(){

    

    const [avatars,setAvatars]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);

    console.log(selectedAvatar);

    let toastOptions={
        position:"top-center",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"light"
    };

    const setProfilePicture=async ()=>{
        console.log("i got called")
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar",toastOptions);
        }else{
            const user=await JSON.parse(localStorage.getItem('chat-app-user'));
            const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar]
            });

            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate("/");
            }else{
                toast.error("Please try again",toastOptions);
            }
        }
    }

    const api='https://api.multiavatar.com/45678945';
    const navigate=useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        }
    },[])

    useEffect(()=>{

        const dat=[];
        const fetchData=async ()=>{

            for(let i=0;i<4;i++){
                try{
                    let {data}=await axios.get(`${api}/${Math.floor(Math.random()*1000)}`)
                let buffer=new Buffer(data);
                dat.push(buffer.toString("base64"));
                }catch(error){
                    console.log(error);
                }
           }

           return dat;

        }
       
        fetchData().then((res)=>{
            setAvatars(dat);
        setIsLoading(false);
        })
        .catch((error)=>{
            console.log("error occured ",error);
        })
        
        
    },[]);

    


    return <div className="w-full p-8 mx-auto">
        <ToastContainer/>
        <div>
            <h1>
                Pick an avatar as your profile picture
            </h1>
        </div>

        <div className="flex gap-4 w-full justify-center py-8">
            {
                avatars.map((avatar,index)=>{
                    return <div key={index} className={`w-32 h-32 cursor-pointer ${selectedAvatar==index?"border border-2 border-black":null}`} onClick={()=>{
                        setSelectedAvatar(index);
                    }}>
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" className="w-full h-32"/>
                    </div>
                })
            }

        </div>

        <button className="bg-green-600 py-2 px-4 border rounded-md" onClick={()=>{setProfilePicture()}}>Set as Profile pic</button>
    </div>
}

export default SetAvatar;