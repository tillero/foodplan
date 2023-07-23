import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const recipe = request.body;
  const { database } = await connectToDatabase();
  const collection = database.collection("recipes");

  const result = await collection.updateOne(
    { _id: ObjectId(recipe._id) },
    {
      $set: {
        title: recipe.title,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        duration: recipe.duration,
        portions: recipe.portions,
        updatedDate: new Date(),
      },
    }
  );
  result !== null
    ? response.status(200).json(result)
    : response.status(400).send("Failed to update recipe in database!");
}
