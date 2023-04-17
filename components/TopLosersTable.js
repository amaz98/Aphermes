import React, { useEffect, useState } from "react";
import styles from "../styles/Aphermes.module.css";
import Image from "next/image";

const TopLosersTable = ({ data }) => {
  const [topLosers, setTopLosers] = useState([]);
  useEffect(() => {
    const allData = [...data].sort((tokenA, tokenB) => {
      return (
        tokenA.price_change_percentage_24h - tokenB.price_change_percentage_24h
      );
    });
    setTopLosers(allData.slice(0, 10));
  }, [data]);
  return (
    <table style={styles.table}>
      <thead>
        <tr className={styles.tokentext}>
          <th>Name</th>
          <th>Current Price</th>
          <th>Price Change (24h)</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody className={styles.databody}>
        {topLosers.length > 0 ? (
          topLosers.map((token) => {
            return (
              <tr className={styles.tokentext} key={token.id}>
                <td>
                  <div className={styles.logodiv}>
                    <Image
                      src={token.image}
                      alt={`${token.name}logo`}
                      width={20}
                      height={20}
                      className={styles.logo}
                    />
                    {token.name}
                  </div>
                </td>
                <td>${(token.current_price ?? 0).toFixed(2)}</td>
                <td>{(token.price_change_percentage_24h ?? 0).toFixed(2)}%</td>
                <td>${(token.market_cap ?? 0).toLocaleString()}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="4">loading</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TopLosersTable;
