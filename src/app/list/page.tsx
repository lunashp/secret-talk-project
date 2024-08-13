import { connectToDatabase, getDatabase } from "../../../services/db";

/**
 * 해당 페이지는 데이터가 변동됨을 감지하여 DB에서 데이터를 받아오는 페이지이기 때문에 dynamic 으로 설정되어야 함
 */
export const dynamic = "force-dynamic";

export default async function List() {
  await connectToDatabase();
  const letterCollection = getDatabase().collection("letters");

  const userCollection = getDatabase().collection("users");

  const allUsers = await userCollection.find({}).toArray();
  // console.log("allUsers", allUsers);

  // Retrieve all documents from the collection
  const allLetters = await letterCollection.find({}).toArray();

  // Print or manipulate the retrieved documents
  // console.log(allLetters);

  const test = allLetters.map((a, i) => a.message + i + ", ");

  // console.log("test", test);

  return (
    <div className="list-bg">
      <div>{test}</div>
    </div>
  );
}
