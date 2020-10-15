import path from "path";
import fs from "fs";

const handleLocalData = (filename: string): string => {
	const pathname = path.join(process.cwd(), `/public/data/${filename}`);
	try {
		const data = fs.readFileSync(pathname, "utf8");
		return data;
	} catch (err) {
		throw new Error(err);
	}
};

export default handleLocalData;
