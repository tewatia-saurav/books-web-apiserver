var User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req: any, res: any) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(409).send("Email allready exists");
  } else {
  
    let salt = await bcrypt.genSalt();
    let hashedPwd = await bcrypt.hash(req.body.password, salt);

    let user = new User({
      name: {
        fname: req.body.fname,
        lname: req.body.lname,
      },
      email: req.body.email,
      password: hashedPwd,
    });

    user.save((err: any, result: any) => {
      if (err) {
        res.status(400).send("Something Went Wrong");
      } else {
        res.status(201).send("Created");
      }
    });
  }
};

exports.login = async (req: any, res: any) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  
  if (user) {
    let verify = await bcrypt.compare(req.body.password, user.password);
 
    if (verify) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '1m'}
      );
      res.status(200).send({ accessToken: accessToken });
    } else {
      res.status(401).send("Wrong Password");
    }
  } else {
    res.status(404).send("User Not Found");
  }
};

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
exports.getUser = async (req:any, res:any) =>{
  
  let user = await User.findOne({email : req.user.email})

  res.status(200).send(user)
}