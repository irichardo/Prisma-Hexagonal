import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import MessageSection from "./components/chatBox";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store/store";
import { useEffect, useRef } from "react";
import { autoLogin } from "./redux/actions/authActions";
import Middleware from "./middleware/appMiddleware";
import cookies from "js-cookie";
import LandingPage from "./pages/landing";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, userInfo, loading } = useSelector((state: RootState) => state.auth);
  const isAutoLoginDone = useRef(false);
  const isMounted = useRef(true);
  const isLogged = localStorage.getItem("_iL") ?? undefined
  useEffect(() => {
    if (
      cookies.get("refresh_token") &&
      !userInfo.id &&
      isMounted.current &&
      !isAutoLoginDone.current
    ) {
      dispatch(autoLogin());
      isAutoLoginDone.current = true;
      return () => {
        isMounted.current = false;
      };
    }
  }, [isAuth, userInfo.id, dispatch]);

  if (loading)
    return (
      <div className="w-screen h-screen bg-red-700 grid place-content-center text-white">
        <span className="animate-spin duration-700 text-3xl">o</span>
      </div>
    );

  // if(loading) return <span>Loading...</span>
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Middleware />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
      ],
    },
    {
      path: "/login",
      element: isAuth || isLogged == '1' ? <Navigate to={'/'} /> : <Login />,
    },
    {
      path: "/messages/:id",
      element: <MessageSection />,
    }
    // {
    //   path: "/landing",
    //   element:isAuth ? <Navigate to={"/"} /> : <LandingPage />,
    // },
    // {
    //   path: "*",
    //   element:<Navigate to="/" />,
    // },
  ]);
  return <RouterProvider router={router} />;
}
