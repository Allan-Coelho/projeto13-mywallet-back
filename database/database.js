import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URI);

try {
    await mongoClient.connect();
}
catch (err) {
    console.log(err.message);
}

const database = mongoClient.db('mywallet');

export default database;
