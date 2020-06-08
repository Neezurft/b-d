import React from "react";
import { createUseStyles } from "react-jss";
import { Amount } from "./Amount";
import { IProvider, IBalance } from "../../api/interfaces";

export const Header: React.FC<{ provider: IProvider; balance: IBalance }> = ({ provider: p, balance: b }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{`Latest ${p.title} Transactions`}</div>
      <div>{`${p.description}: ${p.sort_code} | ${p.account_number}`}</div>
      <div className={classes.info}>
        <div style={{ paddingRight: 5 }}>Balance: </div>
        <Amount amount={{ value: b.amount, currency_iso: b.currency_iso }} />
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  wrapper: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
  },
  title: {
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 20,
  },
  info: {
    paddingTop: 5,
    display: "flex",
    flexDirection: "row",
  },
});
