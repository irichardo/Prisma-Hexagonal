import { useNavigate } from "react-router-dom";

export default function ViewTransitionTest() {
  const navigate = useNavigate();
  if (!document.startViewTransition) {
    return navigate("app/");
  } else
    return document.startViewTransition(() => {
      navigate("app/");
    });
}
