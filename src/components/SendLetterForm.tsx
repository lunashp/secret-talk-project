// "use client";

// import React, { useState } from "react";

// const SendLetterForm: React.FC = () => {
//   const [senderId, setSenderId] = useState("");
//   const [recipientId, setRecipientId] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const response = await fetch("/api/sendLetter", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ senderId, recipientId, message }),
//     });
//     if (response.ok) {
//       alert("Letter sent successfully");
//     } else {
//       alert("Failed to send the letter");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={senderId}
//         onChange={(e) => setSenderId(e.target.value)}
//         placeholder="Sender ID"
//         required
//       />
//       <input
//         type="text"
//         value={recipientId}
//         onChange={(e) => setRecipientId(e.target.value)}
//         placeholder="Recipient ID"
//         required
//       />
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Your message here"
//         required
//       />
//       <button type="submit">Send Letter</button>
//     </form>
//   );
// };

// export default SendLetterForm;
