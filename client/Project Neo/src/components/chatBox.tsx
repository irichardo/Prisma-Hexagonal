import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findUserController } from "../redux/actions/userController";
import { SendMessage } from "./input chat/inputMessage";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

interface IMessage {
  id: number;
  content: string;
  senderId: number;
  conversationId: number;
}

export default function MessageSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootState) => state.auth.userInfo);
  const { selectedFriend } = useSelector((state: RootState) => state.auth);
  const [messageList, setConversation] = useState<{
    id: number;
    name: string;
    messages: IMessage[];
  }>();

  const params = useParams();
  const logout = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("http://localhost:3000/api/v1/users/logout", config)
      .then(() => {
        localStorage.removeItem("_iL");
      })
      .then(() => window.location.reload());
  };

  const conversation = async () => {
    try {
      const conversationMessages = await axios.post(
        "http://localhost:3000/api/v1/messages/find",
        {
          senderId: id,
          receiverId: Number(params.id),
        }
      );
      setConversation(conversationMessages.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    conversation();
    dispatch(findUserController({ id: Number(params.id) }));
    socket.on("message", (message: any) => {
      setConversation((prevMessage) => {
        console.log(prevMessage)
        return {
          ...prevMessage,
          messages: [...prevMessage.messages, message],
        };
      });
    });
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <section className="w-screen h-screen">
      <button
        type="button"
        className="w-20 h-10 bg-green-700"
        onClick={logout}
      />
      <Link className="w-20 h-10 bg-pink-700" to={"/"}>Home</Link>
      <p className="h-1/6 bg-white text-center flex items-center justify-center border-t-2 border-r-2 border-l-2 rounded-tr-lg rounded-tl-lg font-black">
        {selectedFriend && selectedFriend.name}
      </p>
      <ul
        className="w-full h-4/6 flex flex-col overflow-y-auto border-2 scroll-auto"
      >
        {messageList &&
          messageList.messages.map((message: IMessage) => (
            <li className={`w-full h-[20vh] text-white`} key={message.id}>
              <div
                className={`w-full h-full flex items-center ${
                  message.senderId !== id ? "justify-start" : "justify-end"
                }`}
              >
                <span
                  className={`rounded-lg m-4 p-4 ${
                    message.senderId !== id ? "bg-blue-600" : "bg-blue-400"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            </li>
          ))}
      </ul>
      <SendMessage id={id} receiverId={selectedFriend?.id} />
    </section>
  );
}
