const path = require("path");
const fs = require("fs");

const handleLocalData = (filename: string) => {
	const pathname = path.join(process.cwd(), `/public/data/${filename}`);
	console.log("Retrieving local JSON file ...");
	try {
		const data = fs.readFileSync(pathname, "utf8");
		return data; 
	} catch (err) {
		throw new Error(err);
	}
};

export default handleLocalData;
