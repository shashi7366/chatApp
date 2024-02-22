const Message=require("../model/messageModel");


module.exports.addMessage=async (req,res,next)=>{
    try{

        const {to,from,msg}=req.body;

        const ack=await Message.create({
            message:{text:msg},
            users:[from,to],
            sender:from
        });

        if(ack){
            return res.json({status:true,ack});
        }else{
            return res.json({status:false,ack});
        }

    }catch(ex){
        next(ex);
    }
}

module.exports.getAllMessages=async (req,res,next)=>{

    try{

     const {to,from}=req.body;

    

    const matched=await Message.find({users:{$all:[from,to]}}).sort("createdAt");

    

    

    const result=matched.map((match)=>{
        //console.log(match);
        return {
           fromSelf:(match.sender).toString()===from,
           message:match.message.text,
           date:`${match.createdAt.getDate()}-${match.createdAt.getMonth()+1}-${match.createdAt.getFullYear()}`,
           time:`${match.createdAt.getHours()}:${match.createdAt.getMinutes()}`
        }
    })

    return res.json({status:true,result});
    }catch(exp){
        next(exp);
    }
};