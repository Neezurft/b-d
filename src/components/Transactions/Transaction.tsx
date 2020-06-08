import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Theme } from "../../theme";
import moment from "moment";
import { Icon, IconType } from "../Icon";
import { Amount } from "./Amount";
import { ITransaction } from "../../api/interfaces";

export const Transaction: React.FC<{ transaction: ITransaction; delay: number }> = ({ transaction: t, delay }) => {
  const theme = useTheme() as Theme;
  const classes = useStyles({ theme, delay });

  return (
    <div className={classes.wrapper}>
      <div>{moment.utc(t.date).format("LL")}</div>
      <div className={classes.info}>
        <div className={classes.meta}>
          <div className={classes.category}>
            <Icon type={t.category_title as IconType} size={15} />
          </div>
          <div>{t.description}</div>
        </div>
        <Amount amount={t.amount} />
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: Theme) => ({
  "@keyframes expandIn": {
    from: {
      transform: "scale(0)",
      opacity: 0,
    },
  },
  wrapper: ({ delay }: { delay: number }) => ({
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    animation: `$expandIn .3s ease-in-out backwards ${delay}ms`,
  }),
  info: {
    paddingTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    paddingRight: 10,
  },
}));
