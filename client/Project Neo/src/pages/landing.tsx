import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";

export default function LandingPage() {
  const { friends, loading } = useSelector((state: RootState) => state.auth);
  console.log(friends);
  return (
    <div>
      <Link to={"/login"} unstable_viewTransition>
        login
      </Link>
      <ul className="w-full h-1/2 bg-red-500 flex">
        {!loading ? friends.map((friend) => (
          <li className="w-40 h-10 bg-pink-400 flex items-center justify-center rounded-sm" key={friend.id}>
            <Link to={`/messages/${friend.id}`}>
            {friend.name}
            </Link>
            </li>
        )):<div>loading</div>
      }
      </ul>
      <h1>Landing Page</h1>
    </div>
  );
}
