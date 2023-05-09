import React, { useEffect } from "react";
import styles from "../styles/signup.module.css";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import useAuth from "@/hooks/useAuth";
import Authenticated from "@/components/Authenticated";

const Signup = () => {
  const {user} = useAuth()

  return (
    <div className={styles.displaybox}>
      {user ? <Authenticated/> : <SignupForm/>}
    </div>
  );
};

export default Signup;
