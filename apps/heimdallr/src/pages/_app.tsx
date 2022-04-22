import "../styles/global.css";
import "../scripts/wdyr";

import { AppProps } from "next/app";
import { Layout } from "@heimdallr/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
