import Link from "next/link";
import { Box, Heading, Text } from "@chakra-ui/core";

import Header from "./Header";

const Layout: React.FC = ({ children }) => {
	return (
		<Box>
			<Header>
				<Link href="/">
					<a>
						<Heading>HI Maps</Heading>
					</a>
				</Link>
				<nav>
					<Link href="/holoholo">
						<a>
							<Text>Holoholo App</Text>
						</a>
					</Link>
				</nav>
			</Header>
			<Box mx={4}>{children}</Box>
		</Box>
	);
};

export default Layout;
