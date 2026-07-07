import { get } from "mongoose";
import api from "../../utils/axios";

const getCurrentUser=async(req,res)=>{

    try{

        const {data}=await api.get("/api/me");
        console.log(data);



    }catch(error){

console.log(error)

    }

}

export default getCurrentUser