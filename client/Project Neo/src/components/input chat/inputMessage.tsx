import { io } from "socket.io-client";
import { FormEvent, useState } from "react";

const socket = io("http://localhost:3000");

export function SendMessage({
  id,
  receiverId,
}: {
  id: number | null;
  receiverId: number | undefined;
}) {
  const [message, setMessage] = useState<string>("");
  const sendMessageHandler = (event: FormEvent<HTMLElement>) => {
    setMessage((event.target as HTMLInputElement).value);
  };

  const submitMessageHandler = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    socket.emit("join", { senderId: id, receiverId, content: message });
  };
  //   const sendMessage = await axios.post(
  //     "http://localhost:3000/api/v1/messages/send",
  //     {
  //       senderId: Number(id),
  //       receiverId: Number(receiverId),
  //       content: message,
  //     }
  //   );
  //   console.log(sendMessage,id,receiverId,message);
  // };
  // useEffect(()=>{
  //   return()=>{
  //     socket.disconnect()
  //   }
  // },[])
  return (
    <form
      placeholder="Please write a message..."
      className="h-1/6 w-full focus:outline-none border-b-2 border-r-2 border-l-2 placeholder:p-2 placeholder:font-light"
    >
      <input
        type="text"
        className="w-full h-full"
        onChange={sendMessageHandler}
      />
      <input type="submit" onClick={submitMessageHandler} />
    </form>
  );
}
