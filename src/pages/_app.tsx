import Layout from '@/layout/Layout'
import "@/styles/globals.css"
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import store from '@/Redux/store';

export default function App({ Component, pageProps }: AppProps) {

  return(
    <SessionProvider session={pageProps.session}>
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
    </SessionProvider>
  )
}
