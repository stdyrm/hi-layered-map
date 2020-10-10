import mongoose from "mongoose";

const parksCcHnlSchema = new mongoose.Schema({
	_id: { type: mongoose.Types.ObjectId },
	type: { type: String },
	geometry: {
		type: { type: String },
		coordinates: [[[]]] || [[[[]]]]
	},
	properties: {
		NAME: { type: String }
	}
}, { collection: "parks-cc-hnl" });

let ParksCcHnl: mongoose.Model<mongoose.Document, {}>;

try {
	ParksCcHnl = mongoose.model("ParksCcHnl");
} catch (err) {
	ParksCcHnl = mongoose.model("ParksCcHnl", parksCcHnlSchema);
}

export default ParksCcHnl;
