import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(request, response) {
  const { database } = await connectToDatabase();
  const collection = database.collection("recipes");

  const { id } = request.query;

  const result = await collection
    .find({ _id: ObjectId(id) })
    .project({
      uid: 0,
    })
    .limit(1)
    .toArray();
  result[0] !== null
    ? response.status(200).json(result[0])
    : response.status(400).send("Failed to get recipes from database!");
}
