import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";
dotenv.config()

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://" + process.env.DATABASE_USER_NAME + ":" + process.env.DATABASE_USER_PASSWORD + "@cluster0.o0rlwfj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db(process.env.DATABASE_NAME);
    const student = database.collection(process.env.DATABASE_COLLECTION_NAME);
    // create a document to insert
    const doc = {
      name: "Ferdous Mahmud",
      studentID: 404,
      age: 23,
    }
    const result = await student.insertOne(doc);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
