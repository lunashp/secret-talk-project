import type { NextApiRequest, NextApiResponse } from "next";
import { getReceivedLetterDetail } from "../../services/letterService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { letterId } = req.query; // req.body 대신 req.query 사용
    try {
      const letters = await getReceivedLetterDetail(letterId as string);
      res.status(200).json(letters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch received letters" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
