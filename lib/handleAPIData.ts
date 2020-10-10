// used for initially getting raw data from API. 
// Raw data is cleaned, tranformed, and read into JSON files or MongoDB database. 

import { getData, cleanData, writeToJson } from "../util/data";

const handleAPIData = async (url: string | undefined, filename?: false | string) => {
	// url: API url; filename?: *.json filename if writing a new file
	const rawData = await getData(url);
	const data = await cleanData(rawData);
	if (filename) {
		writeToJson(data, filename);
	}
	
	return data;
};

export default handleAPIData;
