import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={customTheme}>
				<CSSReset />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
