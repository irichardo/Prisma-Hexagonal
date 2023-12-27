import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import axios from "axios";
import { ErrorInfo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findUser } from "../redux/reducers/authReducer";

interface IMessage {
  id: number,
  content: string,
  senderId: number,
  converationId: number,
}

export default function MessageSection() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { id, friends } = useSelector((state: RootState) => state.auth.userInfo);
  const [messageList, setConversation] = useState();
  // dispatch(findUser(6))
  // const messages = [
  //   { user: "Richard", type: "Friend", message: "Hola!" },
  //   { user: "Arinalgona", type: "Friend", message: "¿Como estas?", id: 12345 },
  //   {
  //     user: "Richard",
  //     type: "Friend",
  //     message: "¿Me picas la colita?",
  //     id: 54321,
  //   },
  //   { user: "Arinalgona", type: "Friend", message: "Por supuesto!", id: 12345 },
  //   { user: "Richard", type: "Friend", message: "Saca la colita!", id: 54321 },
  //   { user: "Richard", type: "Friend", message: "Saca la colita!", id: 54321 },
  // ];

  // console.log(friends, id)

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
      console.log(error)
    }
    // finally {
    //   setLoading(true)
    // }
    // console.log(conversationMessages.data)
  };

  useEffect(() => {
    conversation();
    dispatch(findUser({ id: 6 }))
  }, []);

  return (
    <section className="w-screen h-screen">
      <button
        type="button"
        className="w-20 h-10 bg-green-700"
        onClick={logout}
      />
      <p className="h-1/6 bg-white text-center flex items-center justify-center border-t-2 border-r-2 border-l-2 rounded-tr-lg rounded-tl-lg font-black">
        {/* {friends.filter((friend) => friend.id === params.id).name} */}
      </p>
      <ul className="w-full h-4/6 flex flex-col overflow-y-auto border-2">
        {messageList ? messageList.messages.map((message: IMessage) => (
          <li className={`w-full h-[20vh]`}>
            {/* <div */}
            {/*   className={`w-full h-full flex items-center ${message.id !== userId ? "justify-start" : "justify-end" */}
            {/*     }`} */}
            {/* > */}
            {/* <span */}
            {/*   className={`rounded-lg m-2 ${message.id !== userId ? "bg-blue-600" : "bg-blue-400" */}
            {/*     } p-2 items-center flex justify-center`} */}
            {/* > */}
            {/* {messageList.messages} */}
            {/* </span> */}
            {/* </div> */}
          </li>
        )) : (<div>Loading</div>)}
      </ul>
      <input
        placeholder="Please write a message..."
        className="h-1/6 w-full focus:outline-none border-b-2 border-r-2 border-l-2 placeholder:p-2 placeholder:font-light"
      />
    </section>
  );
}
