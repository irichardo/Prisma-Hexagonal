import MessageSection from "../components/chatBox";
// import { URL } from "./redux/actions/authActions";
// import { useAppSelector } from "./hooks/redux";

export default function Main() {
  
  return (
    <section className="w-screen h-screen items-center justify-center flex">
      <MessageSection />
      {/* <div className="w-full h-full bg-blue-500 flex items-center justify-center">
        <div>Items</div>
      </div> */}
    </section>
  );
}
 