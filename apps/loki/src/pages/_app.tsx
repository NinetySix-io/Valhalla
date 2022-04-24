import "../scripts/wdyr";

import { AppProps } from "next/app";
import { Layout } from "@loki/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
