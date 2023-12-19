import LoginForm from "../components/loginForm";

export default function Login() {
  // const dispatch = useDispatch();
  // const { loading, isAuth, error } = useSelector(
  //   (state: RootState) => state.auth
  // );
  // console.log(loading, isAuth, error);
  // const app = useAppSelector((state) => state.auth);
  // dispatch({ type: "auth" });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-700">
      <LoginForm />
    </div>
  );
}
