const router=require("express").Router();
const {addMessage,getAllMessages}=require("../controllers/messageController");
router.post("/addmsg",addMessage);
router.post("/allmsg",getAllMessages);

module.exports=router;