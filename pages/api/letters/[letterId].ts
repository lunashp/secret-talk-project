// import { connectToDatabase } from "../../../services/db";
// import { Letter } from '../../../src/model/Letter';

// export default async function handler(req, res) {
//   const {
//     query: { letterId },
//     method,
//   } = req;

//   await connectToDatabase();

//   switch (method) {
//     case "GET":
//       try {
//         const letter = await Letter.findById(letterId); // _id로 문서를 조회합니다.
//         if (!letter) {
//           return res.status(404).json({ success: false });
//         }
//         res.status(200).json({ success: true, data: letter });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     default:
//       res.setHeader("Allow", ["GET"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
