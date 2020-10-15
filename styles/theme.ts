import { theme } from "@chakra-ui/core";

const customTheme = {
	...theme,
  fonts: {
    body: "'PT Sans', system-ui, sans-serif",
    heading: "'PT Sans', Georgia, serif",
    mono: "Menlo, monospace",
	},
	components: {
		Button: {
			baseStyle: {
				// fontWeight: "bold",
			}
		}
	}
};

export default customTheme;
