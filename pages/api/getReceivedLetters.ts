import type { NextApiRequest, NextApiResponse } from "next";
import { getReceivedLetters } from "../../services/letterService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;
    try {
      const letters = await getReceivedLetters(userId as string);
      res.status(200).json(letters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch received letters" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
