import React from 'react';
import {Formik, Form, Field} from 'formik';
import axios from 'axios';
import styles from "../styles/genericform.module.css"
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm = () => {
    const {setIsLoggedIn} = useAuth();
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
                    url: "/api/login",
                    data:{
                        email:values.email,
                        password:values.password,
                    }
                }).then(async (res) => {
                    setIsLoggedIn(true)
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
                    <text className={styles.headertext}>Login</text>
                    <label className={styles.label} htmlFor='email'>Email</label>
                    <Field className={styles.formbox} placeholder="Enter Email" id="email"  name="email" type="email"/>
                    <label className={styles.label} htmlFor='password'>Password</label>
                    <Field className={styles.formbox} placeholder="Enter Password" id="password"  name="password" type="password"/>
                    <button className={styles.button}>Submit</button>
                    <text className={styles.bottomtext}>Dont have an account?<Link href="/signup">Sign Up here</Link></text>
                </Form>
                )
            }}
        </Formik>
    )
}

export default LoginForm;