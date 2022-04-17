import cx from "clsx";
import styles from "./styles.module.css";

export const Layout = ({ children }) => {
  return <div className={cx(styles.container)}>{children}</div>;
};
