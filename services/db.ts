import { MongoClient, Db } from "mongodb";

// client와 db를 명시적으로 null 가능한 타입으로 선언합니다.
// 이는 초기 상태에서 이들이 아직 할당되지 않았음을 명확히 합니다.
let client: MongoClient | null = null;
let db: Db | null = null;

const connectToDatabase = async (): Promise<void> => {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URL!);
    await client.connect();
    db = client.db(process.env.MONGODB_DB!);
  }
};

// getDatabase 함수 반환 타입을 Db로 명확하게 지정합니다.
const getDatabase = (): Db => {
  if (!db) {
    throw new Error("You must connect to the database before accessing it.");
  }
  return db;
};

const disconnectFromDatabase = async (): Promise<void> => {
  if (client) {
    await client.close();
    // client와 db를 null로 명시적으로 재설정합니다.
    // 이는 TypeScript에서 null이 아닌 값을 기대하는 곳에서 실수로 사용되는 것을 방지합니다.
    client = null;
    db = null;
  }
};

const getClientPromise = (): Promise<MongoClient> => {
  return connectToDatabase().then(() => {
    if (!client) {
      throw new Error("MongoDB client has not been initialized.");
    }
    return client;
  });
};

export {
  connectToDatabase,
  getDatabase,
  disconnectFromDatabase,
  getClientPromise,
};
