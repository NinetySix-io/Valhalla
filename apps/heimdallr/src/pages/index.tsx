import { Layout } from "@heimdallr/layout";
import cx from "clsx";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={cx(styles.container)}>
        <h1>Heimdallr</h1>
      </div>
    </Layout>
  );
}
