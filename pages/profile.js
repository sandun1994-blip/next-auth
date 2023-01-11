import { getSession } from "next-auth/react"
import Link from "next/link"

export default function Profile(){

    return <div>profile


        <Link href={'/'}>home pahe</Link>
    </div>
}



export  async function getServerSideProps({req}){


    const session = await getSession({req})

    if(!session){
        return{
            redirect:{
                destination:'/login',
                premanent:false
            }
        }
    }
    return {
        props:{session}
    }
}