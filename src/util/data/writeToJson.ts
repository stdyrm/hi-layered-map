import path from "path";
import fs from "fs";

interface IConvertedGeoJson {
	type: string;
	geometry: {
		coordinates: any[];
	};
}

interface IWriteToJson {
	(convertedGeoJson: IConvertedGeoJson, filename: string): void;
}

const writeToJson: IWriteToJson = (
	convertedGeojson: IConvertedGeoJson,
	filename: string
) => {
	const filePath = path.join(process.cwd(), `/public/data/${filename}`);
	fs.writeFile(
		filePath,
		JSON.stringify(convertedGeojson),
		(err) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log(`JSON file created at ${filePath}`);
			}
		}
	);
};

export default writeToJson;
