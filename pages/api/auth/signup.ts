import { signIn } from "next-auth/react";
import bcrypt from "bcrypt";
import { connectToDatabase, getDatabase } from "../../../services/db";

export default async function handler(request, response) {
  if (request.method === "POST") {
    if (request.body.name === "") {
      response.status(400).json({ error: "닉네임을 입력해주세요" });
      return;
    }

    if (request.body.email === "") {
      response.status(400).json({ error: "이메일을 입력해주세요" });
      return;
    }

    if (request.body.password === "") {
      response.status(400).json({ error: "비밀번호을 입력해주세요" });
      return;
    }

    const hash = await bcrypt.hash(request.body.password, 10);

    request.body.password = hash;

    await connectToDatabase();
    const userCollection = getDatabase().collection("users");

    await userCollection.insertOne(request.body);

    console.log("userCollection", userCollection);

    // response.status(200).json("가입 성공");
    response.redirect(302, "/");
  }
}
