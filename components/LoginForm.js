import React from 'react';
import {Formik, Form, Field} from 'formik';
import axios from 'axios';
import styles from "../styles/genericform.module.css"
import Link from "next/link";
import {signIn} from "next-auth/react";

const LoginForm = () => {
    return (
        <Formik initialValues={{
            email:'',
            password:'',
        }}
        onSubmit={async (data) => {
            try {
                signIn("credentials", {...data, redirect: false})
            } catch (err){
                console.log(err)
            }
        }}
        >
            {({handleSubmit}) => {
                return(
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <p className={styles.headertext}>Login</p>
                    <label className={styles.label} htmlFor='email'>Email</label>
                    <Field className={styles.formbox} placeholder="Enter Email" id="email"  name="email" type="email"/>
                    <label className={styles.label} htmlFor='password'>Password</label>
                    <Field className={styles.formbox} placeholder="Enter Password" id="password"  name="password" type="password"/>
                    <button className={styles.button}>Submit</button>
                    <p className={styles.bottomtext}>Dont have an account?<Link href="/signup">Sign Up here</Link></p>
                </Form>
                )
            }}
        </Formik>
    )
}

export default LoginForm;