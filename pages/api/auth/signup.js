import { hash } from "bcryptjs";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";

export default async function handler(req,res){


   connectMongo().catch(error=>res.json({error:'connection failed'}))
   //o nly post metho
   if (req.method==='POST') {
    if (!req.body) {
        return res.status(404).json({error:'Dont have form data...'})
    }
const {username,email,password} =req.body

//check exsisting

const checkexisting= await Users.findOne({email})
if(checkexisting) return res.status(422).json({message:'user alredy exsisting'})

//hash password

Users.create({username,email,password:await hash(password,12)},function(err,data){
    if(err) return res.status(404).json({err})
    res.status(201).json({status:true,user:data})
})


   }else{
    res.status(500).json({message:'HTTP methoad not valid only POST accept'})
   }
}