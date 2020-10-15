import Head from "next/head";
import { Global, css } from "@emotion/core";
import styles from "../styles/Home.module.css";

// components
import { Layout } from "../components/layout";

const Home: React.FC = () => {
	return (
		<Layout>
			<Head>
				<title>HI Maps</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1>HI Maps</h1>
			</main>
			<footer className={styles.footer}></footer>
			<Global
				styles={css`
					* {
						margin: 0px;
						padding: 0px;
						box-sizing: border-box;
					}
				`}
			/>
		</Layout>
	);
};

export default Home;
