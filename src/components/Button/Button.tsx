import { PropsWithChildren } from "react";
import style from "./styles.module.css";

export const Button: React.FC<PropsWithChildren> = ({ children }) => {
  return <button className={style.big}>{children}</button>;
};
