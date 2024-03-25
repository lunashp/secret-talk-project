import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  const client = await MongoClient.connect(process.env.MONGODB_URL!);
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  client.close();

  if (existingUser) {
    res.status(200).json({ isDuplicate: true });
  } else {
    res.status(200).json({ isDuplicate: false });
  }
}

export default handler;
