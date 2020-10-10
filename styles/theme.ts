const THEME = {
	colors: {},
	container: {
		minHeight: "100vh",
		padding: "0 05rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	main: {
		padding: "5rem 0",
		flex: "1",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		width: "100%",
		height: "100px",
		borderTop: "1px solid #eaeaea",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& img": {
			left: "05rem",
		},
		"& a": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}
	}
};

export default THEME;
