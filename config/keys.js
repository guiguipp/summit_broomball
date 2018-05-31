require("dotenv").config();
console.log("keys loaded\n\n");

exports.keys = {
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USER
};