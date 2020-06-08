import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Theme } from "../../theme";

export function ErrorText() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return <div className={classes.wrapper}>Oops, something has gone wrong, please come back later!</div>;
}

const useStyles = createUseStyles((theme: Theme) => ({
  "@keyframes shake": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "50%": {
      transform: "rotate(-10deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  wrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    animation: "$shake 0.4s",
  },
}));
