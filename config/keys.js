require("dotenv").config();

exports.keys = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
};