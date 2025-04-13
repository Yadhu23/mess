import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

    const prisma=new PrismaClient();
export async function POST(req)
{
    try{
        const{username,email,password}= await req.json();
        const existinguser= await prisma.user.findUnique({ where:{email}});
        if(existinguser)
        {
            return new Response(JSON.stringify({error:"user already exist"}),{status:400});
        }
        const hash= await bcrypt.hash(password,9);
        const newuser= await prisma.user.create({data:{
            name:username,
            password:hash,
            email:email,
        },
    });
    return new Response(JSON.stringify({message:"new user created",user:newuser}),{status:200});
    }
    catch(error)
    {
        console.error("registeration error",error);
        return new Response(JSON.stringify({error:"server error"}),{status:500});
    }
}
