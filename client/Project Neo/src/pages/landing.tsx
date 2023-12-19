import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <Link to={"/login"} unstable_viewTransition>
        login
      </Link>
      <h1>Landing Page</h1>
    </div>
  );
}
