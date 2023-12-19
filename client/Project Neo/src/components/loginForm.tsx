import { FormEnumLogin } from "../types/enumTypes";
import { useForm } from "../hooks/formHook";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import {
  // autoLogin,
  userLogin,
} from "../redux/actions/authActions";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { form, formHandler } = useForm();
  const { loading, isAuth, error } = useSelector(
    (state: RootState) => state.auth
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(userLogin({ email, password }));
    if (error) console.log(error);
    if (isAuth) navigate("/", { unstable_viewTransition: true });
  };

  // useEffect(() => {
  //   if (!isAuth && !localStorage.getItem("userToken")) {
  //     dispatch(autoLogin());
  //   } else if (localStorage.getItem("userToken")) {
  //     navigate("/main", { unstable_viewTransition: true });
  //   }
  // }, [isAuth, dispatch, navigate]);
  return (
    <form
      action="submit"
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-bold">Login</h1>
      <span>username</span>
      <input
        type="email"
        id={FormEnumLogin.email}
        onChange={(value) => formHandler(value)}
        required
      />
      <span>password</span>
      <input
        type="password"
        id={FormEnumLogin.password}
        onChange={(value) => formHandler(value)}
        required
      />
      {/* <Link to={"/passwordRecovery"}>¿Forgot Password?</Link> */}
      <button type="submit" className="border-2 hover:w-20" disabled={loading}>
        Login
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
}
