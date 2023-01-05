import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const user = request.body;
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

  const result = await collection.insertOne(user);
  result !== null
    ? response.status(200).json(result)
    : response.status(400).send("Failed to create user in database!");
}
