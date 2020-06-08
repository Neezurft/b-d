import React from "react";
import { useTheme } from "react-jss";
import { Theme } from "../../theme";

export interface IAmount {
  value: number;
  currency_iso?: string;
}

export const Amount: React.FC<{ amount: IAmount }> = ({ amount }) => {
  const theme = useTheme() as Theme;

  const color = amount.value >= 0 ? theme.sucess : theme.danger;
  return (
    <div>
      <span style={{ color, paddingRight: 5 }}>{`${Math.abs(amount.value)}`}</span>
      <span>{amount.currency_iso}</span>
    </div>
  );
};
