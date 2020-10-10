import connectDB from "../util/db/database";
import mongoose from "mongoose";

const handleDatabase = async (model: mongoose.Model<mongoose.Document, {}>) => {
	connectDB();
	try {
		console.log("Fetching data ...");
		const data = await model.find({});
		return JSON.stringify({
			type: "FeatureCollection",
			features: data
		});
	} catch (err) {
		console.log(err);
	}
};

export default handleDatabase;
