import React from "react";
import styles from "../styles/signup.module.css";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

const Signup = () => {
  return (
    <div className={styles.displaybox}>
      <SignupForm/>
    </div>
  );
};

export default Signup;
