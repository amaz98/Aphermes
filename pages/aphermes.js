import React, { useEffect, useState } from "react";
import styles from "../styles/Aphermes.module.css";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { caretForwardOutline, caretBackOutline } from "ionicons/icons";
import AllCryptoTable from "@/components/AllCryptoTable";
import Pagination from "@/components/Pagination";
import TopGainersTable from "@/components/TopGainersTable";
import TopLosersTable from "@/components/TopLosersTable";

const Aphermes = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 100;

  useEffect(() => {
    const fetchTotalCryptoCount = async () => {
      setLoading(true);
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      const globalData = await response.json();
      setTotalPages(
        Math.ceil(globalData.data.active_cryptocurrencies / perPage)
      );
      setLoading(false);
    };

    fetchTotalCryptoCount();
  }, []);

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${currentPage}&sparkline=false`
        );

        if (response.status === 429) {
          setError("Rate limit exceeded. Please try again later");
        } else if (!response.ok) {
          setError("An error occured while fetching data.");
        } else {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        setError("An error occured while  fetching data");
      }
      setLoading(false);
    };

    fetchCryptoData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className={styles.aphermes}>
      <div className={styles.aphermesleftcell}>
        <div className={styles.allcryptocell}>
          <div className={styles.datacellheader}>
            <text className={styles.headertext}>
              Top 500 Cryptocurrencies (Mcap)
            </text>
          </div>
          <div className={styles.cryptolist}>
            <AllCryptoTable data={data} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      <div className={styles.aphermesrightcell}>
        <div className={styles.rightcells}>
          <div className={styles.datacellheader}>
            <text className={styles.headertext}>Top Gainers (24H)</text>
          </div>
          <div className={styles.rightcelldata}>
            <TopGainersTable data={data} />
          </div>
        </div>
        <div className={styles.rightcells}>
          <div className={styles.datacellheader}>
            <text className={styles.headertext}>Top Losers (24H)</text>
          </div>
          <div className={styles.rightcelldata}>
            <TopLosersTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Aphermes;
