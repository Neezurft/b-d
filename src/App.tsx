import React from "react";
import { Transactions } from "./components/Transactions";
import { createUseStyles, useTheme } from "react-jss";
import { Theme } from "./theme";

function App() {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.wrapper}>
      <Transactions />
    </div>
  );
}

const useStyles = createUseStyles((theme: Theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.backgroundDark,
      fontFamily: theme.fontFamily,
      color: theme.color,
      "& ::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  wrapper: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    overflow: "scroll",
  },
}));

export default App;
