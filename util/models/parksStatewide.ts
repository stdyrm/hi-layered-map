import mongoose from "mongoose";

const parksStatewideSchema = new mongoose.Schema({
	_id: { type: mongoose.Types.ObjectId },
	type: { type: String },
	geometry: {
		type: { type: String },
		coordinates: [[[]]]
	},
	properties: {
		NAME: { type: String }
	}
}, { collection: "parks-statewide" });

let ParksStatewide: mongoose.Model<mongoose.Document, {}>;

try {
	ParksStatewide = mongoose.model("ParksStatewide");
} catch (err) {
	ParksStatewide = mongoose.model("ParksStatewide", parksStatewideSchema);
}

export default ParksStatewide;
