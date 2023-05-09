import React from 'react';
import {Formik, Form, Field} from 'formik';
import axios from 'axios';
import styles from "../styles/genericform.module.css"
import Link from "next/link";
import useAuth from '@/hooks/useAuth';


const SignupForm = () => {
    const {getUser, user} = useAuth();
    return (
        <Formik initialValues={{
            email:'',
            password:'',
        }}
        onSubmit={async (data) => {
            try {
                const response = await axios({
                    method:"post",
                    timeout:100000,
                    url: "/api/signup",
                    data:{
                        email:data.email,
                        password:data.password,
                    }
                }).then(async (res) => {
                    console.log(res);
                })
            } catch (err){
                console.log(err)
            }
        }}
        >
            {({handleSubmit}) => {
                return(
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <p className={styles.headertext}>Create an account</p>
                    <label className={styles.label} htmlFor='email'>Email</label>
                    <Field className={styles.formbox} placeholder="Enter Email" id="email"  name="email" type="email"/>
                    <label className={styles.label} htmlFor='password'>Password</label>
                    <Field className={styles.formbox} placeholder="Enter Password" id="password"  name="password" type="password"/>
                    <button className={styles.button}>Sign Up</button>
                    <p className={styles.bottomtext}>Already have an account?<Link href="/login">Login here</Link></p>
                </Form>
                )
            }}
        </Formik>
    )
}

export default SignupForm;