import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { menuOutline, closeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const [menuActive, setMenuActive] = useState(false);

  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  const resetMenu = () => {
    setMenuActive(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    resetMenu();
  }
  return (
    <div className={styles.navbar}>
      <Link onClick={resetMenu} href="/aphermes">
        <Image
          src="/assets/aphermeslogo.png"
          width={400}
          height={100}
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
              isLoggedIn ?
              <li>
              <Link
                onClick={handleLogout}
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
        { 
              isLoggedIn ?
              <li>
              <Link
                onClick={handleLogout}
                className={styles.link}
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
          <IonIcon icon={closeOutline} className={styles.icon}></IonIcon>
        ) : (
          <IonIcon icon={menuOutline} className={styles.icon}></IonIcon>
        )}
      </button>
    </div>
  );
};

export default Navbar;
