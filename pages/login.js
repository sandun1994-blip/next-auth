import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../layout/layout";
import styles from '../styles/Form.module.css'

import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"; 
import { useState } from "react";
import {signIn} from 'next-auth/react'
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";

export default function Login() {

    const router =useRouter()
const formik = useFormik({
    initialValues:{email:'',password:''},
    onSubmit,
    validate:login_validate
})

async function onSubmit(values){
    console.log(values);

    const status =await signIn('credentials',{
        redirect:false,
        email:values.email,
        password:values.password,
        callbackUrl:'/'
    })
   if (status.ok) {
    router.push(status.url)
   }
}
    const [show,setShow] =useState(false)


    const handleClick =async()=>{
        signIn('google','http://localhost:3000')
    }

    return (<Layout>
        <Head>
            <title>Login</title>
        </Head>
        <section className="w-3/4 mx-auto">

            <div className="title">
                <h1 className="text-gray-800 text-4xl font-bold py-4">
                    Explore
                </h1>
                <p className="w-3/4 mx-auto text-gray-400">Lorem asbgshbs ahshjsjs hssjjshdsggsb hdshhshhs</p>
            </div>

            <form className="flex flex-col gap-5"  onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                    <input type="email" name="email" placeholder="Email" className={styles.input_text} onChange={formik.handleChange} value={formik.values.email}/>
                    <span className='icon flex items-center px-4'>
                    <HiAtSymbol size={25} />
                    </span>
                </div>
                 {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <> </>} 

                <div className={styles.input_group}>
                    <input type={`${show ? "text" : "password"}`} name="password" placeholder="Password" className={styles.input_text} onChange={formik.handleChange} value={formik.values.password}/>
                    <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                    <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <> </>} 




                <div className={styles.button}>
                    <button type="submit">
                        Login
                    </button>
                </div>


                <div className="input-button">


                    <button type="button" className={styles.button_custom} onClick={handleClick}> 
                        Sign In With Google <Image src={'/assets/google.svg'} width='20' height={20} alt='dd'></Image>
                    </button>



                </div>


                <div className="input-button" >

                    <button type="button" className={styles.button_custom}>
                        Sign In With Github  <Image src={'/assets/github.svg'} width='25' height={25} alt='uu'></Image>
                    </button>

                </div>


            </form>

            <p className="text-center text-gray-400">
                don't have account yet  <Link href={'/register'}>Sign Up</Link>
            </p>

        </section>
    </Layout>)
}