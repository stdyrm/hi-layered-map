import Link from "next/link";
import { ThemeProvider } from "emotion-theming";
import Header from "./Header";
import THEME from "../../styles/theme";

const Layout: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={THEME}>
			<Header>
				<Link href="/">
					<a>
						<h1>HI Maps</h1>
					</a>
				</Link>
				<nav>
					<Link href="/holoholo">
						<a>Holoholo App</a>
					</Link>
				</nav>
			</Header>
			{children}
		</ThemeProvider>
	);
};

export default Layout;
