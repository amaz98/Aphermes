import React from "react";
import styles from "../styles/signup.module.css";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className={styles.displaybox}>
      <LoginForm/>
    </div>
  );
};

export default Login;
