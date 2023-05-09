import React from "react";
import styles from "../styles/Aphermes.module.css";
import { IonIcon } from "@ionic/react";
import { caretForwardOutline, caretBackOutline } from "ionicons/icons";
import CustomIonIcon from "./CustomIonIcon";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className={styles.pagination}>
      <button
        style={{ display: "flex", justifyContent: "center" }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <CustomIonIcon icon={caretBackOutline} role='img'/>
      </button>
      <span
        style={{
          alignSelf: "center",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        {currentPage} / {totalPages}
      </span>
      <button
        style={{ display: "flex", justifyContent: "center" }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
       <CustomIonIcon icon={caretForwardOutline} role='img' />
      </button>
    </div>
  );
};

export default Pagination;
