import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Theme } from "../theme";

type DropDownProps<T extends string> = { values: Readonly<T[]>; selectedValue: T; onValSelected: (val: T) => void };

export function DropDown<T extends string>({ values, selectedValue, onValSelected }: DropDownProps<T>) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <select
      className={classes.wrapper}
      value={selectedValue}
      name="select"
      onChange={(e) => onValSelected((e.target.value as any) as T)}
    >
      {values.map((val) => (
        <option key={val} value={String(val)}>
          {val}
        </option>
      ))}
    </select>
  );
}

const useStyles = createUseStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.background,
    color: theme.color,
    borderRadius: 5,
    padding: 2,
  },
}));
