
function Message({message,time,align,image}){

    console.log(align);

    return <div className="grid grid-cols-12 grid-rows-2 min-w-[40%] gap-2">
        {align=="left"?<div className="col-span-2 row-span-2">
            <img src={`data:image/svg+xml;base64,${image}`} />
        </div>:null}
        <div className={`row-span-2 col-span-10 flex flex-col justify-end ${align=="right"?'bg-green-300':'bg-white'} border rounded-md shadow-md py-2 px-4`}>
            <p className={`${align=="right"?"text-right":"text-left"}`}>{message}</p>
            <p className={`${align=="right"?"text-right":"text-left"} text-sm font-light text-gray-400`}>{time}</p>
        </div>
        {align=="right"?<div className="col-span-2 row-span-2">
            <img src={`data:image/svg+xml;base64,${image}`} />
        </div>:null}
    </div>
}

export default Message;