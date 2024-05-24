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

  const { title, receive_user_id, send_user_id, message } = req.body;

  try {
    await connectToDatabase();
    const lettersCollection = getDatabase().collection("letters");

    console.log("lettersCollection", lettersCollection);

    // Get 3 random user IDs except the logged-in user
    // const otherUsers = await getDatabase()
    //   .collection("users")
    //   .aggregate([
    //     { $match: { _id: { $ne: new ObjectId(senderId) } } },
    //     { $sample: { size: 3 } },
    //   ])
    //   .toArray();

    // console.log("otherUsers", otherUsers);

    // Insert letters for each random user
    const currentDate = new Date();
    {
      await lettersCollection.insertOne({
        send_user_id: new ObjectId(send_user_id),
        receive_user_id: new ObjectId(receive_user_id),
        title,
        message,
        send_date: currentDate,
        is_read: false,
        del_at: false,
        report_at: false,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
