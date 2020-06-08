import React, { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Theme } from "../../theme";
import { Loading } from "../Loading";
import { ErrorText } from "./ErrorText";
import { Header } from "./Header";
import { Transaction } from "./Transaction";
import { DropDown } from "../DownDown";
import moment from "moment";
import { fetchTransactionsByProvider } from "../../api";
import { ITransaction, ProviderTransactions } from "../../api/interfaces";

const filterOptions = ["date:asc", "date:desc", "amount:asc", "amount:desc", "category:asc", "category:desc"] as const;
type IFilter = typeof filterOptions[number];

export function Transactions() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [transactions, setTransactions] = useState<ProviderTransactions | null>(null);
  const [filterBy, setFilterBy] = useState<IFilter>("amount:asc");

  useEffect(() => {
    const load = async () => {
      try {
        // a little delay for demo purposes...
        const providerTransactions = await fetchTransactionsByProvider();

        await new Promise((res) => setTimeout(res, 1000));
        setTransactions(providerTransactions);
        if (isInvalid(providerTransactions)) {
          throw new Error("Unexpected response shape");
        }
      } catch (error) {
        console.warn("There was an error trying to fetch data.", error);
        setError(true);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className={classes.wrapper}>
      {loading ? (
        <div className={classes.loading}>
          <Loading size={2} />
        </div>
      ) : error || !transactions ? (
        <ErrorText />
      ) : (
        <>
          <Header provider={transactions.provider} balance={transactions.balance} />
          <div className={classes.filterDropDown}>
            <div className={classes.filterByText}>Filter by:</div>
            <DropDown
              values={filterOptions}
              selectedValue={filterBy}
              onValSelected={(val) => {
                setFilterBy(val as IFilter);
              }}
            />
          </div>
          {transactions.transactions.sort(by(filterBy)).map((t, i) => (
            <Transaction key={t.id + filterBy} transaction={t} delay={i * 50} />
          ))}
        </>
      )}
    </div>
  );
}

/**
 * Returns a function that can be used to sort transactions according to the sort argument.
 */
function by(sort: IFilter) {
  const sortByFunctions: { [key in IFilter]: (t1: ITransaction, t2: ITransaction) => number } = {
    "date:asc": (t1, t2) => moment.utc(t1.date).diff(moment.utc(t2.date)),
    "date:desc": (t1, t2) => moment.utc(t2.date).diff(moment.utc(t1.date)),
    "amount:asc": (t1, t2) => Math.abs(t1.amount.value) - Math.abs(t2.amount.value),
    "amount:desc": (t1, t2) => Math.abs(t2.amount.value) - Math.abs(t1.amount.value),
    "category:asc": (t1, t2) => (t1.category_title === t2.description ? 0 : t1.description > t2.description ? 1 : -1),
    "category:desc": (t1, t2) => (t1.description === t2.description ? 0 : t1.description > t2.description ? -1 : 1),
  };

  if (sortByFunctions[sort] === undefined) {
    return sortByFunctions["amount:desc"];
  }

  return sortByFunctions[sort];
}

/**
 * Very simple function to check that the response has the expected shape
 * Returns true if the shape is the expected shape or false otherwise.
 * @example
 * // returns false
 * isInvalid({ foo: "bar" })
 */
function isInvalid(providerTransactions: ProviderTransactions) {
  if (
    providerTransactions?.transactions?.length === undefined ||
    providerTransactions?.id === undefined ||
    providerTransactions?.balance === undefined ||
    providerTransactions?.provider === undefined
  ) {
    return true;
  }

  return false;
}

const useStyles = createUseStyles((theme: Theme) => ({
  wrapper: {
    width: 300,
    minHeight: "90%",
    overflowY: "scroll",
    maxWidth: 300,
    backgroundColor: theme.background,
    padding: 20,
    margin: 15,
    borderRadius: 5,
  },
  loading: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  filterDropDown: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 25,
  },
  filterByText: {
    fontSize: 10,
    paddingRight: 5,
  },
}));
