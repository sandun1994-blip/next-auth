import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import {useSession,signIn,signOut, getSession} from 'next-auth/react'
export default function Home() {
  
const {data:session} = useSession()

function handleSignout(){
  signOut()
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({session,handleSignout}) : Guest()}
    </div>
  )
}

// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/login'}><div className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</div></Link>
          </div>
      </main>
  )
}

// Authorize User
function User({session,handleSignout}){
  return(
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

          <div className='details'>
            <h5>{session.user.name}</h5>
            <h5>{session.user.email}</h5>
          </div>

          <div className="flex justify-center">
            <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500' onClick={handleSignout}>Sign Out</button>
          </div>

          <div className='flex justify-center'>
            <Link href={'/profile'}><div className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</div></Link>
          </div>
      </main>
  )
}

export async function getServerSideProps({req}){

  const session =await getSession({req})

  if (!session) {

    return {
      redirect:{
        destination:'login',
        permanent:false
      }
    }
    
  }
  return {
    props:{session}
  }
}