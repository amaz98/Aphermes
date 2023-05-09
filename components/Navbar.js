import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { menuOutline, closeOutline } from "ionicons/icons";
import Cookies from 'js-cookie';
import CustomIonIcon from "./CustomIonIcon";
import useAuth from "@/hooks/useAuth";
import { destroyCookie } from "nookies";


const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const {user} = useAuth();

  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  const resetMenu = () => {
    setMenuActive(false);
  };

  const handleLogout = () => {
    console.log("handlelogout called")
    Cookies.remove("token", {path:'/'});
    resetMenu();
    window.location.reload()
  }
  return (
    <div className={styles.navbar}>
      <Link onClick={resetMenu} href="/aphermes">
        <Image
          src="/assets/aphermeslogo.png"
          width={400}
          height={100}
          priority={true}
          style={{
            alignSelf: "center",
            paddingLeft: "50px",
            paddingTop: "10px",
          }}
          alt=""
        />
      </Link>
      {menuActive && (
        <div className={styles.popupmenu}>
          <ul className={styles.dropdownlist}>
            <li>
              <Link
                onClick={resetMenu}
                href="/categories"
                className={styles.dropdownlink}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                onClick={resetMenu}
                href="/portfolio"
                className={styles.dropdownlink}
              >
                Portfolio
              </Link>
              </li>
              { 
              user ?
              <li>
              <Link
                onClick={handleLogout}
                href="/logout"
                className={styles.dropdownlink}
              >
                Logout
              </Link> </li>:
              <li>
              <Link
                onClick={resetMenu}
                href="/signup"
                className={styles.dropdownlink}
              >
                Signup/Login
              </Link></li> }
           
          </ul>
        </div>
      )}
      <ul className={styles.list}>
        <li>
          <Link href="/categories" className={styles.link}>
            Categories
          </Link>
        </li>
        <li>
          <Link href="/portfolio" className={styles.link}>
            Portfolio
          </Link>
        </li>
        { user ?
              <li>
              <Link
                onClick={handleLogout}
                className={styles.link}
                href="/logout"
              >
                Logout
              </Link> </li>:
              <li>
              <Link
                onClick={resetMenu}
                href="/signup"
                className={styles.link}
              >
                Signup/Login
              </Link> </li>}
      
      </ul>
      <button onClick={handleMenu} className={styles.hamburgerMenuButton}>
        {menuActive ? (
          <CustomIonIcon icon={closeOutline} style={{color:'white', fontSize:'60px', alignItem:'center'}} role='img'/>
        ) : (
          <CustomIonIcon icon={menuOutline} style={{color:'white', fontSize:'60px', alignItem:'center'}} role='img'/>
        )}
      </button>
    </div>
  );
};

export default Navbar;
