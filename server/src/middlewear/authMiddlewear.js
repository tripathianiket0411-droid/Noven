import { readAccessToken } from "../utils/utils.js";

export function authenticate(req,res,next){

    console.log("headers",req.headers)

    const authorization = req.headers.authorization;

    console.log("authorizayion",authorization)

    if(!authorization){
        return res.status(401).json({
            message:"Authorization headers missing "
        })
    }

    const accessToken = req.headers.authorization.split(" ")[1];

    if(!accessToken){
        return res.status(400).json({
            message:"AccessToken not found in the request header"
        })
    }

    try {
        const decoded = readAccessToken(accessToken)

        req.user = decoded;

        next()

    } catch (error) {
        return res.status(400).json({
            message:"Invalid or expire accessToken"
        })
    }
}

export function authenticateSeller(req,res,next){
    if(req.user.role !== "seller"){
        return res.status(403).json({
            message:"User is not authorized to perform this action"
        })
    }

    next()
}