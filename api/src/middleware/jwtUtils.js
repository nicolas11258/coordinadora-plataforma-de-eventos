import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const secretKey = config.secretKey;

export const generateToken =  ( user ) =>{
    const token =  jwt.sign({user},secretKey,{expiresIn:'1h'});
    return token;
}

export const authToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({status:"error",error:"Unauthorized"})
    const token = authHeader.split(' ')[1];
    jwt.verify(token,secretKey,(error,credentials)=>{
        if(error) return res.status(401).send({status:"error",error:"Unauthorized"})
        req.user = credentials.user.id;
        next();
    })
}
