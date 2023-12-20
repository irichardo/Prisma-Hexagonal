import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { Navigate, Outlet } from "react-router-dom";

export default function DashBoardLayout() {
  const { isAuth, loading } = useSelector((state: RootState) => state.auth);
  const isLogin = localStorage.getItem("_iL");
  if (loading && isAuth)
    return (
      <div className="w-screen h-screen bg-blue-400 grid place-content-center">
        <span>Loading...</span>
      </div>
    );
  return isLogin === '1' || isAuth  ? (
    <Outlet />
  ) : (
    <Navigate to="/login"/>
  );
}
