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

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "사용자 생성됨!" });
    res.statusCode;
    client.close();
  }
}

export default handler;
