const User = require("../model/useModel")
const brcryt = require("bcrypt")
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck) {
            return res.json({ msg: "Username is already used", status: false })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "Email is already used", status: false })
        }
        const hashpassword = await brcryt.hash(password, 10);
        const user = await User.create({
            email, username, password: hashpassword,
        })
        delete user.password;
        return res.json({ status: true, user })
    }
    catch (ex) {
        next(ex);
    }
};
module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ msg: "Username not found ", status: false })
        }
        const isValidPassword = await brcryt.compare(password,user.password)
        if (!isValidPassword) {
            return res.json({ msg: "Wrong Password!!!", status: false })
        }
        delete user.password;
        return res.json({ status: true, user })
    }
    catch (ex) {
        next(ex);
    }
};



module.exports.Avatar = async (req, res, next) => {
    try{
        
    }catch(err){
        next(err);
    }
}