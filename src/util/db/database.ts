import mongoose from "mongoose";

interface Connection {
	isConnected: false | number;
}

const connection: Connection = { isConnected: false };

const connectDB = async () => {
	if (connection.isConnected !== false) {
		console.log(
			`Database is already connected. Ready state: ${connection.isConnected}`
		);
	} else {
		console.log("Creating database connection ...");
		let db;
		try {
			db = await mongoose.connect(process.env.ATLAS_URI as string, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		} catch (err) {
			console.error(err.message);
		}
		if (db) {
			connection.isConnected = db.connections[0].readyState;
		} else {
			connection.isConnected = false;
		}
		console.log(
			`Database is now connected. Connection ready state: ${connection.isConnected}`
		);
	}
};

export default connectDB;
