import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import { compare } from "bcryptjs";


export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
 name:'Credentials',
 async authorize(credentials,req){

  connectMongo().catch(error=>{error:"Coneection failed"})

  //check user exsisting

  const result =await Users.findOne({email:credentials.email})
  if (!result) {


    throw new Error("No user found please sign up")
    
  }

  //compare
  const checkPassword = await compare(credentials.password,result.password)

  //incorer
  if (!checkPassword || result.email !== credentials.email) {

    throw new Error("User name password dosent match")
    
  }

  return result

 }
        })
      ],
      secret:'odqHmKA/LMbrpje43jvxNPvlL8JYUZLE7NldOONyR5E='
})