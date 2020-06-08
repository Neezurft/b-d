import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Theme } from "../theme";

export const Loading: React.FC<{ size?: number }> = ({ size }) => {
  const theme = useTheme();
  const classes = useStyles({ size: size || 1, theme });

  return <div className={classes.wrapper} />;
};

const useStyles = createUseStyles((theme: Theme) => ({
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  wrapper: ({ size }: { size: number }) => ({
    zoom: size,
    width: 10,
    height: 10,
    border: `2px solid ${theme.color}`,
    borderRadius: "50%",
    borderTopColor: "transparent",
    animation: "$spin 1s infinite",
  }),
}));
