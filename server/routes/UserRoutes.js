const { default: SetAvatar } = require("../../public/src/components/SetAvatar")
const { register } = require("../controller/UserControllers")
const { login } = require("../controller/UserControllers")

const router =require("express").Router()
router.post("/login", login)
router.post("/register",register)
router.post("/Avatar/:id",SetAvatar)
module.exports=router;

