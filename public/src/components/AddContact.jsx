import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { useState } from "react";
import axios from "axios";
import {searchContact,addContactRoute} from "../utils/APIRoutes";
import {useDispatch, useSelector} from "react-redux";

import {fetchContacts} from "../feature/contactSlice"


function AddContact({setShowAddContact}){

    const [searchResult,setSearchResult]=useState();
    const [query,setQuery]=useState();

    const dispatch=useDispatch();
    const {user}=useSelector((state=>{return state.contacts}));


    function searchUser(){
        console.log("called ",query);
        axios.post(searchContact,{
            username:query
        })
        .then(({data})=>{
            setSearchResult(data.users);
        })
        .catch((err)=>{
            console.log("At AddContact page ",err.message);
        })
    }

    function handleSelection(id=null){
        axios.post(addContactRoute,{id:user._id,contactId:id})
        .then((res)=>{
            console.log(res);
          //  user.contacts.push(id);
          localStorage.setItem('chat-app-user',res.data.user);
            dispatch(fetchContacts([...user.contacts,id]));
        }).catch((err)=>{
            console.log(err);
        })
        setShowAddContact(prev=>{
            return !prev;
        })
    }

    return<div className="w-[95%] md:w-[70%] h-[80%] absolute bottom-0 bg-white border rounded-t-3xl shadow-md shadow-slate-800 border-none z-50 pb-8 px-4 flex justify-center addContactWindow">
        <div className="w-full sm:w-[50%] h-full">
        <div className="w-full flex justify-end my-4"><button
        onClick={()=>{
            setShowAddContact(prev=>{
                return !prev;
            })
        }}
        ><IoIosCloseCircleOutline className="text-red-500 h-8 w-8 hover:scale-110"/></button></div>
        <div className="border border-bray-400 rounded-full h-8 flex items-center">
            <input type="text"
            placeholder="search contacts.."
            className="border-none m-0 h-full w-[90%] rounded-full border-box px-2"
            onChange={(e)=>{
                setQuery(e.target.value);
            }}/>
            <button onClick={()=>{
                searchUser();
            }}><IoIosSearch className="h-full w-8"/></button>
        </div>

        <div className="w-full min-h-[70%] px-4 bg-gray-50 mt-16 border rounded-md overflow-auto">
            {searchResult && searchResult.map((result,index)=>{
                return <div key={index} className="flex w-[90%] h-16 items-center gap-4 my-4 border px-4 py-2 border-box bg-white rounded-md hover:scale-110"
                onClick={()=>{
                    handleSelection(result._id);
                }}>
                    <img src={`data:image/svg+xml;base64,${result.avatarImage}`} className="max-h-[90%]"/>
                    {result.username}
                </div>
            })}
        </div>
        </div>
    </div>
}

export default AddContact;