import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/userActions.jsx";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();
  const loginHandler =(user) => {
    dispatch(asyncLoginUser(user));
    reset();
    navigate("/");
  };
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/register");
  };
  return (
    <div className="bg-[var(--bg)] h-[92.6vh] w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="loginBg bg-[var(--border)] h-[60%] w-[35%] p-10 rounded-xl flex gap-6 flex-col"
      >
        <h2 className="self-center text-3xl font-bold tracking-wider text-[var(--text-h)] mb-4">
          Login
        </h2>
        <input
          {...register("email")}
          className="px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
          type="text"
          placeholder="E-mail"
        />
        <input
          {...register("password")}
          className="px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
          type="password"
          placeholder="Password"
        />
        <button className="bg-[var(--btn)] p-3 flex iteam-center  justify-center rounded-md text-xl active:scale-98 text-[var(--btn-t)] tracking-wide mt-4 cursor-pointer">
          Login
        </button>

        <p className="text-center text-[var(--text-p)]">
          Don't have an account ?{" "}
          <span
            onClick={navigateHandler}
            className="active:scale-95 text-[var(--text-h)] cursor-pointer"
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
