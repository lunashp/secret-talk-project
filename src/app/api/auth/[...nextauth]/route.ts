import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { User } from "@/model/User";
import {
  connectToDatabase,
  getClientPromise,
  getDatabase,
} from "../../../../../services/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// connectToMongoDB 함수를 getClientPromise 함수로 대체하는 경우 (예시)
// 이 부분은 db.ts 파일의 내용에 따라 달라질 수 있습니다.
// 만약 db.ts 파일에서 getClientPromise 함수를 사용하여 MongoDB 연결을 관리한다면,
// 아래와 같이 MongoDBAdapter에 해당 함수를 인자로 제공할 수 있습니다.

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        await connectToDatabase(); // 이 부분도 db.ts의 구현에 따라 변경될 수 있습니다.

        const user = await getDatabase()
          .collection<User>("users")
          .findOne({ email: credentials!.email });

        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }

        const pwCheck = await bcrypt.compare(
          credentials!.password,
          user.password!
        );

        if (!pwCheck) {
          console.log("비밀번호가 틀림");
          return null;
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          _id: (user as unknown as User)._id,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      //@ts-ignore
      session.user = token.user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // MongoDBAdapter에 client promise를 전달하는 방식으로 변경
  // 아래 코드는 db.ts 파일의 구현에 따라 getClientPromise 함수를 사용하는 예시입니다.
  adapter: MongoDBAdapter(getClientPromise()),
});

export { handler as GET, handler as POST };
// export { handler };
