import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { useState } from "react";
import axios from "axios";
import {searchContact} from "../utils/APIRoutes";
import {useDispatch} from "react-redux";

import {updateContacts} from "../feature/contactSlice"


function AddContact({setShowAddContact}){

    const [searchResult,setSearchResult]=useState();
    const [query,setQuery]=useState();

    const dispatch=useDispatch();


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
        dispatch(updateContacts(id));
        setShowAddContact(prev=>{
            return !prev;
        })
    }

    return<div className="w-[90%] sm:w-[50%] h-[80%] absolute bg-white border rounded-md shadow-md border-gray-600 z-50 pb-8 px-4">
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
                    handleSelection();
                }}>
                    <img src={`data:image/svg+xml;base64,${result.avatarImage}`} className="max-h-[90%]"/>
                    {result.username}
                </div>
            })}
        </div>
    </div>
}

export default AddContact;