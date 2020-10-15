import Head from "next/head";
import Link from "next/link";
// components
import { Layout } from "../components/layout";
import { Box, Button, Grid, Text } from "@chakra-ui/core";

const Home: React.FC = () => {
	return (
		<Layout>
			<Head>
				<title>HI Maps</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box as="main">
				<h1>HI Maps</h1>
			</Box>
			<Grid templateColumns="repeat(4, 1fr)" gap={6}>
					<Link href="/holoholo" passHref>
						<Button color="white" bg="gray.700" as="a">
							<Text fontSize="xl">Holoholo</Text>
						</Button>
					</Link>
			</Grid>
		</Layout>
	);
};

export default Home;
