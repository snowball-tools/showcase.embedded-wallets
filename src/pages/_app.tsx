import { AppProps } from "next/app";
import Head from "next/head";

function InAppWalletsDemo({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default InAppWalletsDemo;
