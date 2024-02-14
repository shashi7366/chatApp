{/* <Emoji emoji="grinning-face-with-big-eyes"/>
<span role="img" aria-label="grinning face with big eyes" class="react-emojis" style="line-height: 1">😃</span>
U+1F603 */}

//<span role="img" aria-label="grinning face with big eyes" class="react-emojis" style="line-height: 1">😃</span>


function EmojiPicker({setEmoji,setShowPicker}){

    let emojis=['\u{1F601}','\u{1F602}','\u{1F603}','\u{1F604}','\u{1F605}','\u{1F606}','\u{1F607}','\u{1F608}','\u{1F609}','\u{1F610}','\u{1F611}','\u{1F612}','\u{1F613}','\u{1F614}'];
    let e='1F605';

    return <div className="bg-[#f1f5f9] p-2 grid grid-cols-4 gap-2 border-none rounded-md w-64 h-64 bg-slate-600 overflow-auto">
        {
            emojis.map((emoji)=>{
                return <p className="col-span-1 w-full text-3xl"
                onClick={()=>{
                    setEmoji(e=>e+emoji);
                    setShowPicker(s=>!s);
                }}>{emoji}</p>;
            })
        }
    </div>
}

export default EmojiPicker;