import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client} contextSharing={true}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
