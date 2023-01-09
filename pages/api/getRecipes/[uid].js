import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(request, response) {
  const { database } = await connectToDatabase();
  const collection = database.collection("recipes");

  const { uid } = request.query;

  const result = await collection
    .find({ userId: uid })
    .sort({ createdDate: -1 })
    .project({
      uid: 0,
    })
    .limit(10)
    .toArray();
  result !== null
    ? response.status(200).json(result)
    : response.status(400).send("Failed to get recipes from database!");
}
