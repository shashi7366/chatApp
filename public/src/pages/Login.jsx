import {Link,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";

import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {

    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate("/chat");
        }
    },[]);

    let toastOptions={
        position:"top-center",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"light"
    };

    const [values,setValues]=useState({
        username:"",
        password:""
    });

    const handleChange=(e)=>{

        setValues(
            {...values,[e.target.name]:e.target.value}
        );
        //console.log(values);
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(handleValidation()){
            //call api here

            const {username,password}=values;
            let {data}=await axios.post(loginRoute,{
                username,password
            });

            if(data.status===false){
                toast.error(data.message,toastOptions);
            }

            if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                toast.success("Login success! redirecting to chat page");
                navigate("/chat");
            }
        }
    }

    const handleValidation=()=>{
        const {password,username}=values;
         if(password.length<1){
            toast.error("Email and password is required",toastOptions);
            return false;
        }else if(username.length<1){
            toast.error("Email and password is required",toastOptions);
            return false;
        }else{
            return true;
        }
    }


    return <div className="lpContainer w-full h-screen flex flex-col justify-center">
        <div className="w-[80%] m-auto">
        <ToastContainer/>
        
        <form 
        className="flex flex-col items-center p-4 justify-between border w-full pb-16 pt-8"
        onSubmit={handleSubmit}>
            <h1 className="font-normal text-3xl"><span className="text-5xl font-semibold">C</span>hat</h1>
            <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                min={3}
                className="border rounded-sm p-2 w-full my-2"
            />
            
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="border rounded-sm p-2 w-full my-2"
            />

            
            <button type="submit" className="bg-green-300 px-4 py-2 border rounded-md my-2">Login</button>
            <span>Don't have an account ? <Link to="/register" className="text-blue-600">Register</Link></span>
        </form>
        
    </div>
    </div>;
}

export default Login;