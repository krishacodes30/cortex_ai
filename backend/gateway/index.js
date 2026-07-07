import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors";
import { protect } from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import cookieParser from "cookie-parser";


dotenv.config()


const port=process.env.PORT


const app=express()
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/me",protect,getCurrentUser)


app.get("/",(req,res)=>{
    res.json({"msg":"hello from gateway"});
})

app.listen(port,()=>{
    console.log(" gateway started",port);
})

