const path = require("path");
const fs = require("fs");

interface IConvertedGeoJson {
	type: string;
	geometry: {
		coordinates: any[];
	};	
}

interface IWriteToJson {
	(convertedGeoJson: IConvertedGeoJson, filename: string): void;
}

const writeToJson: IWriteToJson = (convertedGeojson: IConvertedGeoJson, filename: string) => {
	const filePath = path.join(process.cwd(), `/public/data/${filename}`);
	fs.writeFile(filePath, JSON.stringify(convertedGeojson), (err: string): void => {
		if (err) {
			console.log(err);
		} else {
			console.log(`JSON file created at ${filePath}`);
		}
	});
};

export default writeToJson;
