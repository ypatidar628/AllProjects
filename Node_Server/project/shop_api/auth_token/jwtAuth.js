import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

///ENV File Configuration
dotenv.config();

class JWT_Auth {
    generateToken = (userId)=>{
        var token = jwt.sign({userId : userId },process.env.TOKEN_SECRET,{
            expiresIn:"1h"
        })
        return token;
    
    }

    tokenAuthentic = (req,res,next) =>{
        const auth_header = req.headers["authorization"];
        const token = auth_header && auth_header.split(" ")[1];

        if(!token){
            return res.status(401).json({"status":false , "message":"Token Missing"})
        }
        else{
            jwt.verify(token,process.env.TOKEN_SECRET,(err,tokenData)=>{
                if(err){
                    return res.status(401).json({"status":false , "message":"Token Invalid"})
                }
                else{
                    console.log("JWT Token Data : "+tokenData);
                    req.user = tokenData.userId
                    return req.user;
                }
            })
        }
        next()
    }
}
export default new JWT_Auth();