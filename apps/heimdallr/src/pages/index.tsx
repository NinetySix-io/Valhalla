import { Logo } from "@valhalla/react";
import cx from "clsx";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.logoContainer)}>
        <Logo className={cx(styles.logo)} />
      </div>
    </div>
  );
}
