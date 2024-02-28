const router=require("express").Router();
const {register, login, setAvatar, getAllUsers,searchUser,addContact,findContacts}=require("../controllers/userController");

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);
router.post("/searchuser",searchUser);
router.route("/addcontact").post(addContact);
router.route("/findcontacts").post(findContacts);



module.exports=router;