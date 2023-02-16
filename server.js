import express from "express";
import cors from "cors";
import fs from "fs";
import { MongoClient } from "mongodb";
var env_vars = JSON.parse(fs.readFileSync("./env.json", "utf8"));
var app = express();
app.use(cors());
app.use(express.json());
var client = new MongoClient(env_vars.mongodb_url);
var db = client.db("quran");

app.get("/records", async (request, response) => {
	response.json(await db.collection("records").find().toArray());
});

app.post("/records", async (request, response) => {
	var { insertedId } = await db.collection("records").insertOne(request.body);

	response.json(insertedId);
});

app.listen(4000, () => console.log("server started on port 4000"));