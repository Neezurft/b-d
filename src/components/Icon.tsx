import React from "react";
import { useTheme } from "react-jss";
import { Theme } from "../theme";
import { AiTwotoneShopping, AiFillCar } from "react-icons/ai";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaMoneyBillAlt, FaLightbulb, FaHamburger } from "react-icons/fa";
import { GiReceiveMoney, GiPartyFlags } from "react-icons/gi";

export const Icon: React.FC<{ type: IconType; size?: number }> = ({ type, size }) => {
  const theme = useTheme() as Theme;
  const IconComponent = getIcon(type);

  return <IconComponent size={size} color={theme.color} />;
};

function getIcon(type: IconType): React.FC<{ size?: number; color?: string }> {
  switch (type) {
    case "Shopping":
      return AiTwotoneShopping;
    case "Groceries":
      return MdLocalGroceryStore;
    case "Income":
      return GiReceiveMoney;
    case "Transport":
      return AiFillCar;
    case "Entertainment":
      return GiPartyFlags;
    case "Bills":
      return FaLightbulb;
    case "Eating Out":
      return FaHamburger;
    default:
      return FaMoneyBillAlt;
  }
}

export type IconType = "Shopping" | "Groceries" | "Income" | "Transport" | "Entertainment" | "Bills" | "Eating Out";
