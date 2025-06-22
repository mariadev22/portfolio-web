import type { APIRoute } from "astro";
import { MongoClient } from "mongodb";

const uri = import.meta.env.MONGO_URI;
const client = new MongoClient(uri);

export const GET: APIRoute = async ({ request }) => {
  try {
    await client.connect();
    const db = client.db("portfolio");
    const collection = db.collection("cv");
    const data = await collection.findOne({});
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Error al conectar con MongoDB",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    await client.close();
  }
};
