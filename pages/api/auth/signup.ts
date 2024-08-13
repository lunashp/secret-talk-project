import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      res.status(422).json({ message: "데이터가 유효하지 않습니다." });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URL!);
    const db = client.db();

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      // 사용자 데이터 삽입
      const result = await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword,
      });

      // 성공 응답
      res.status(201).json({ message: "사용자 생성됨!" });
    } catch (error) {
      console.error(error);
      // 에러 응답
      res.status(500).json({ message: "서버에서 오류가 발생했습니다." });
    } finally {
      client.close(); // 데이터베이스 연결 종료
    }
  } else {
    // 지원되지 않는 메서드에 대한 응답
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method Not Allowed`);
  }
}

export default handler;
