import Head from "next/head";
import Layout from "../layout/layout";
import styles from '../styles/Form.module.css'

import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi"; 
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Register() {


    const [show1,setShow1] =useState(false)
    const [show2,setShow2] =useState(false)
    return (<Layout>

<Head>
            <title>Register</title>
        </Head>
        <section className="w-3/4 mx-auto">

            <div className="title">
                <h1 className="text-gray-800 text-4xl font-bold py-4">
                Register
                </h1>
                <p className="w-3/4 mx-auto text-gray-400">Lorem asbgshbs ahshjsjs hssjjshdsggsb hdshhshhs</p>
            </div>

            <form className="flex flex-col gap-5">
                <div className={styles.input_group}>
                    <input type="text" name="userName" placeholder="UserName" className={styles.input_text}/>
                    <span className='icon flex items-center px-4'>
                    <HiOutlineUser size={25} />
                    </span>
                </div>

                <div className={styles.input_group}>
                    <input type= "email" name="email" placeholder="Email" className={styles.input_text} />
                    <span className='icon flex items-center px-4' >
                    <HiFingerPrint size={25} />
                    </span>
                </div>

                <div className={styles.input_group}>
                    <input type={`${show1 ? "text" : "password"}`} name="password" placeholder="Password" className={styles.input_text} />
                    <span className='icon flex items-center px-4' onClick={() => setShow1(!show1)}>
                    <HiFingerPrint size={25} />
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input type={`${show2 ? "text" : "password"}`} name="cpassword" placeholder="Confirm Password" className={styles.input_text} />
                    <span className='icon flex items-center px-4' onClick={() => setShow2(!show2)}>
                    <HiFingerPrint size={25} />
                    </span>
                </div>


                <div className={styles.button}>
                    <button type="submit">
                    Sign In
                    </button>
                </div>


                <div className="input-button">


                    <button type="button" className={styles.button_custom}> 
                        Sign In With Google <Image src={'/assets/google.svg'} width='20' height={20}></Image>
                    </button>



                </div>


                <div className="input-button" >

                    <button type="button" className={styles.button_custom}>
                        Sign In With Github  <Image src={'/assets/github.svg'} width='25' height={25}></Image>
                    </button>

                </div>


            </form>

            <p className="text-center text-gray-400">
                 Have an account  <Link href={'/login'}>Login</Link>
            </p>

        </section>
    </Layout>)
}