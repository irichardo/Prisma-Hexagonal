import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import axios from "axios";
import { IParticipants } from "../redux/reducers/types/userTypes";

export default function MessageSection() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { conversations } = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  console.log(conversations);

  const userId = 54321;
  const messages = [
    { user: "Richard", type: "Friend", message: "Hola!" },
    { user: "Arinalgona", type: "Friend", message: "¿Como estas?", id: 12345 },
    {
      user: "Richard",
      type: "Friend",
      message: "¿Me picas la colita?",
      id: 54321,
    },
    { user: "Arinalgona", type: "Friend", message: "Por supuesto!", id: 12345 },
    { user: "Richard", type: "Friend", message: "Saca la colita!", id: 54321 },
    { user: "Richard", type: "Friend", message: "Saca la colita!", id: 54321 },
  ];

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

  return (
    <section className="w-screen h-screen">
      <button
        type="button"
        className="w-20 h-10 bg-green-700"
        onClick={logout}
      />
      <p className="h-1/6 bg-white text-center flex items-center justify-center border-t-2 border-r-2 border-l-2 rounded-tr-lg rounded-tl-lg font-black">
        Arianalgona
      </p>
      <ul className="w-full h-4/6 flex flex-col overflow-y-auto border-2">
        {messages.map((message) => (
          <li className={`w-full h-[20vh]`}>
            <div
              className={`w-full h-full flex items-center ${message.id !== userId ? "justify-start" : "justify-end"
                }`}
            >
              <span
                className={`rounded-lg m-2 ${message.id !== userId ? "bg-blue-600" : "bg-blue-400"
                  } p-2 items-center flex justify-center`}
              >
                {message.message}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <input
        placeholder="Please write a message..."
        className="h-1/6 w-full focus:outline-none border-b-2 border-r-2 border-l-2 placeholder:p-2 placeholder:font-light"
      />
    </section>
  );
}
