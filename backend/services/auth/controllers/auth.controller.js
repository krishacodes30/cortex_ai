import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";



export const login=async(req,res)=>{

    try{

const {token}=req.body

const decoded =await getAuth(app).verifyIdToken(token);
console.log(decoded);

  let user =
      await User.findOne({
        firebaseUid:
          decoded.uid,
      });

 if (!user) {

      user =
        await User.create({

          firebaseUid:decoded.uid,

          email:decoded.email,

          name:decoded.name,

          avatar:decoded.picture,

          provider:decoded.firebase?.sign_in_provider,
        });
         }



        const sessionId =crypto.randomUUID();

// redissssss

         res.cookie( "session",sessionId,

      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:1000 * 60 * 60 * 24 * 7
         
      }
    );

     return res.json({success: true,user,
    });
   





    }catch(error){
       console.log("LOGIN ERROR:", error);
    
    return res.status(401).json({ message: error.message });
}}