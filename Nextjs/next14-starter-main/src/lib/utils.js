const { default: mongoose } = require("mongoose");

async function main() {
	await mongoose.connect("mongodb://localhost:27017/NextJs14");
	// eslint-disable-next-line no-console
	console.log("Database connected Succesfully !!");
}

main().catch(() => console.log("Could not connect to the database !!"));
