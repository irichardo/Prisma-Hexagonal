import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// styles
import "./index.css";
//Components
// import Landing from "./app";
import { store } from "./redux/store/store";
import App from "./app";

// const useAuthMiddleware = ({
//   location,
//   history,
//   state,
// }: {
//   location: any;
//   history;
//   any;
//   state: any;
// }) => {
//   const isAuth = useSelector((state: RootState) => state.auth.isAuth);
//   if (!isAuth && location.pathname !== "/") {
//     history.push("/");
//   }
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/forgotPassword",
//     element: <PasswordRecovery />,
//   },
//   {
//     path: "/main",
//     element: <Chat />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
