import axios from "axios";

const getData = async (url: string | undefined, params?: {}) => {
	try {
		const { data } = await axios.get(url as string);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export default getData;
