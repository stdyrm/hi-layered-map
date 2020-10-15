import mongoose from "mongoose";

const publicTrailsSchema = new mongoose.Schema(
	{
		_id: { type: mongoose.Types.ObjectId },
		type: { type: String },
		geometry: {
			type: { type: String },
			coordinates: [[]],
		},
		properties: {
			NAME: { type: String },
		},
	},
	{ collection: "public-trails" }
);

let PublicTrails: mongoose.Model<mongoose.Document>;

try {
	PublicTrails = mongoose.model("PublicTrails");
} catch (err) {
	PublicTrails = mongoose.model("PublicTrails", publicTrailsSchema);
}

export default PublicTrails;
