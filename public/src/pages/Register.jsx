import {Link,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";

import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {

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
        email:"",
        password:"",
        confirmPassword:""
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

            const {username,email,password}=values;
            let {data}=await axios.post(registerRoute,{
                username,email,password
            });

            if(data.status===false){
                toast.error(data.message,toastOptions);
            }

            if(data.status===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                toast("Registeration Success! Redirecting to chat page.",toastOptions);
                navigate("/chat");
            }
        }
    }

    const handleValidation=()=>{
        const {password,confirmPassword,username,email}=values;
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password should be same",toastOptions);
            return false;
        }else if(password.length<8){
            toast.error("Password should be at least 8 character long",toastOptions);
            return false;
        }else if(username.length<4){
            toast.error("username should be at least of length 4",toastOptions);
            return false;
        }else if(email.length<1){
            toast.error("Please enter an email",toastOptions);
            return false;
        }else{
            return true;
        }
    }


    return <div className="w-full h-screen lpContainer flex flex-col justify-center">
        <div className="w-2/3 m-auto">
        <ToastContainer/>
        <h1 className="font-normal text-3xl"><span className="text-5xl font-semibold">C</span>hat</h1>
        <form 
        className="flex flex-col items-center p-4 justify-between border w-full"
        onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                className="border rounded-sm p-2 w-full my-2"
            />
            <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                className="border rounded-sm p-2 w-full my-2"
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="border rounded-sm p-2 w-full my-2"
            />

            <input
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                className="border rounded-sm p-2 w-full my-2"
            />
            <button type="submit" className="bg-green-300 px-4 py-2 border rounded-md my-2">Register</button>
            <span>Already have an account ? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
        
    </div>
    </div>;
}

export default Register;