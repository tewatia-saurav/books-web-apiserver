var jwt = require('jsonwebtoken')

exports.authorize = (req: any, res: any, next: any) => {  
    const authHeader = req.headers['authorization']
    
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token == null){
      return res.status(400).send()
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any, user:any)=>{
        if(err){
          return res.status(403).send()
        } 
        req.user = user
        next()
    })
  };