var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let user = yield User.findOne({ email: req.body.email });
    if (user) {
        res.status(409).send("Email allready exists");
    }
    else {
        let salt = yield bcrypt.genSalt();
        let hashedPwd = yield bcrypt.hash(req.body.password, salt);
        let user = new User({
            name: {
                fname: req.body.fname,
                lname: req.body.lname,
            },
            email: req.body.email,
            password: hashedPwd,
        });
        user.save((err, result) => {
            if (err) {
                res.status(400).send("Something Went Wrong");
            }
            else {
                res.status(201).send("Created");
            }
        });
    }
});
exports.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let user = yield User.findOne({
        email: req.body.email,
    });
    if (user) {
        let verify = yield bcrypt.compare(req.body.password, user.password);
        if (verify) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
            res.status(200).send({ accessToken: accessToken });
        }
        else {
            res.status(401).send("Wrong Password");
        }
    }
    else {
        res.status(404).send("User Not Found");
    }
});
// exports.authorize = (req: any, res: any, next: any) => {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if(token == null){
//     return res.status(400).send()
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any, user:any)=>{
//       if(err){
//         return res.send(403).send()
//       } 
//       req.user = user
//       next()
//   })
// };
//testing
exports.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let user = yield User.findOne({ email: req.user.email });
    res.status(200).send(user);
});
