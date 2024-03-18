import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoApi";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import styles from "./Tablecoin.module.css";

const Tablecoint = ({ coins, isLoading, currency, setChart }) => {
  return (
    <div className={styles.contianer}>
      {isLoading ? (
        <RotatingLines strokeWidth="2" strokeColor="#3874ff" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                setChart={setChart}
                currency={currency}
                coin={coin}
                key={coin.id}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tablecoint;

const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    name,
    image,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  } = coin;
  const [currencySym, setCurrencySym] = useState("");

  useEffect(() => {
    const checkCurrency = () => {
      if (currency === "usd") {
        setCurrencySym("$");
      } else if (currency === "eur") {
        setCurrencySym("€");
      } else {
        setCurrencySym("¥");
      }
    };
    checkCurrency();
  }, [currency]);

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div onClick={showHandler} className={styles.symbol}>
          <img src={image} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currencySym}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>
        {currencySym}
        {total_volume.toLocaleString()}
      </td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} />
      </td>
    </tr>
  );
};
