import Picker from "emoji-picker-react";
import {BsEmojiSmileFill} from "react-icons/bs";
import {IoMdSend} from "react-icons/io";
import { useState,useEffect} from "react";
import EmojiPicker from "./EmojiPicker";
function ChatInput({addChat}){

    const [showPicker,setShowPicker]=useState(false);
    const [text,setText]=useState();


    const sendChat=(e)=>{
        if(text.length>0){
            addChat(text);
            setText("");
        }
    }

    return <div>
        {showPicker && <div className="absolute left-4 bottom-16">
            <EmojiPicker setEmoji={setText} setShowPicker={setShowPicker} />
            </div>}
        <div className="w-full py-2 px-4 bg-[#cbd5e1] ">
        
        <div className=" w-full border-none rounded-md grid grid-cols-12 items-center">
            <BsEmojiSmileFill className="col-span-1 h-8 w-full" onClick={()=>{setShowPicker(!showPicker)}}/>
        <input type="text"
        className="h-10 col-span-10 bg-[#f8fafc] border-none rounded-md px-4 py-2"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        />

        <IoMdSend className="col-span-1 h-8 w-full" onClick={sendChat}/>
        </div>
    </div>
    </div>
}

export default ChatInput;