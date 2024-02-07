const User=require("../model/userModel");
const bcrypt=require("bcrypt");
const { use } = require("../routes/userRoutes");

module.exports.register=async (req,res,next)=>{
    try{
        const {username,email,password}=req.body;

    const usernameCheck=await User.findOne({username});

    if(usernameCheck){
        return res.json({message:"username already used",status:false});
    }

    const emailCheck=await User.findOne({email});

    if(emailCheck){
        return res.json({message:"Email already in use",status:false});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        username,
        email,
        password:hashedPassword
    });

    delete user.password;
    return res.json({status:true,user});
    }catch(error){
        next(error);
    }
    
    // console.log(req.body);
}


module.exports.login=async (req,res,next)=>{
    try{

        const {username,password}=req.body;

        const user=await User.findOne({username});

        if(!user){
            return res.json({message:"Either email or Password is not valid",status:false});
        }
        else{
            const isValid=await bcrypt.compare(password,user.password);

            if(!isValid){
                return res.json({message:"Either email or password is not valid",status:false});
            }else{
                delete user.password;
                console.log(user);
                return res.json({status:true,user});
            }
        }
    }catch(exp){
        next(exp);
    }
}

module.exports.setAvatar=async (req,res,next)=>{

    try{
        const {image}=req.body;

        const id=req.params.id;

        const user=await User.findByIdAndUpdate(id,{
            isAvatarImageSet:true,
            avatarImage:image
        });

        console.log(user);

        return res.json({isSet:user.isAvatarImageSet,image:user.avatarImage});
    }catch(error){
        next(error);
    }
}

module.exports.getAllUsers=async (req,res,next)=>{
    try{

        const users= await User.find({_id:{$ne:req.params.id}}).select(["email","username","avatarImage","_id"]);

        return res.json(users);
    }catch(error){
        next(error);
    }
}