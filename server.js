import express from "express";
import cors from "cors";
import fs from "fs";
import { MongoClient, ObjectId } from "mongodb";
var env_vars = JSON.parse(fs.readFileSync("./env.json", "utf8"));
var app = express();
app.use(cors());
app.use(express.json());
var client = new MongoClient(env_vars.mongodb_url);
var db = client.db(env_vars.mongodb_db_name);

app.get("/records", async (request, response) => {
	response.json(await db.collection("records").find().toArray());
});

app.post("/records", async (request, response) => {
	//return value is either "limit_reached" or inserted row id (string)
	var current_records = await db.collection("records").find().toArray();
	if (current_records.length >= 605 / 5) {
		response.json("limit_reached");
		return;
	}
	var { insertedId } = await db.collection("records").insertOne(request.body);

	response.json(insertedId);
});
app.post("/new_is_read_state", async (request, response) => {
	//body must be like this :{ record_id : string ,new_is_read_state : boolean }
	await db
		.collection("records")
		.updateOne(
			{ _id: ObjectId(request.body.record_id) },
			{ $set: { is_read: request.body.new_is_read_state } }
		);
	response.json("ok");
});
app.listen(env_vars.api_port, () => console.log(`server started on port ${env_vars.api_port}`));