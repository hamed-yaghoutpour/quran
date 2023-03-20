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
/* for (var i = 1; i < 31; i++) {
	await db.collection("records").insertOne({
		name: "unknown",
		part_number: i + 1,
		privacy_mode: false,
	});
} */
app.get("/records", async (request, response) => {
	response.json(await db.collection("records").find().toArray());
});

app.post("/records", async (request, response) => {
	//body must be like this : {part_number : number , name : string , privacy_mode : bool}

	//return value is either "taken" or inserted row id (string)
	//taken means that part is taken by another one
	var mongodb_response = await db
		.collection("records")
		.updateOne(
			{ part_number: request.body.part_number },
			{ $set: request.body },
			{ upsert: true }
		);
	if (mongodb_response.upsertedCount === 1) {
		response.json(mongodb_response.upsertedId);
	} else {
		response.json("taken");
	}
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
