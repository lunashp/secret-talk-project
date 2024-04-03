// letterService.ts
import { ObjectId } from "mongodb";
import { connectToDatabase, getDatabase, disconnectFromDatabase } from "./db";

const sendLetter = async (
  senderId: string,
  recipientId: string,
  message: string,
  title: string
): Promise<void> => {
  try {
    await connectToDatabase();
    const lettersCollection = getDatabase().collection("letters");

    const letter = {
      senderId: new ObjectId(senderId),
      recipientId: new ObjectId(recipientId),
      message,
      title,
      sentDate: new Date(),
    };
    console.log("letter", letter);

    await lettersCollection.insertOne(letter);
  } finally {
    await disconnectFromDatabase();
  }
};

const getReceivedLetters = async (userId: string): Promise<any[]> => {
  try {
    await connectToDatabase();
    const lettersCollection = getDatabase().collection("letters");

    const receivedLetters = await lettersCollection
      .find({ receive_user_id: new ObjectId(userId) })
      .toArray();
    return receivedLetters;
  } finally {
    await disconnectFromDatabase();
  }
};

const getReceivedLetterDetail = async (letterId: string): Promise<any> => {
  console.log("letterId", letterId);
  try {
    await connectToDatabase();
    const lettersCollection = await getDatabase()
      .collection("letters")
      .findOne({ _id: new ObjectId(letterId) });

    if (!lettersCollection) {
      return null; // 또는 적절한 에러 처리
    }

    // 필요한 정보만 추출하여 반환
    const { send_user_id, message, title, receive_user_id, is_read } =
      lettersCollection;
    return { send_user_id, message, title, receive_user_id, is_read };
  } catch (error) {
    console.error("Error fetching letter detail:", error);
    throw error; // 또는 적절한 에러 처리
  } finally {
    await disconnectFromDatabase();
  }
};

export { sendLetter, getReceivedLetters, getReceivedLetterDetail };
