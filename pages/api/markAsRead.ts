import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase, getDatabase } from "../../services/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { letterId } = req.query;

  try {
    await connectToDatabase();
    const lettersCollection = getDatabase().collection("letters");

    // 해당하는 편지의 is_read 상태를 true로 업데이트
    await lettersCollection.updateOne(
      { _id: new ObjectId(letterId as string) },
      { $set: { is_read: true } }
    );

    //   client.close();

    res.status(200).json({ message: "Letter marked as read successfully." });
  } catch (error) {
    // 데이터베이스 연결 실패 시 에러 처리
    // if (client) client.close();
    console.error(error);
    res.status(500).json({ message: "Failed to mark the letter as read." });
  }
  //   } else {
  //     // POST 요청이 아닌 경우 에러 처리
  //     res.setHeader('Allow', ['POST']);
  //     res.status(405).end(`Method ${req.method} Not Allowed`);
  //   }
}
