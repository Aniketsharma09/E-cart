import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/userActions.jsx";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Register = () => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();
  const registerHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    reset();
    dispatch(asyncRegisterUser(user));
    navigate("/login");
    toast.success("Register Succesfully");
  };
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/login");
  };
  return (
    <div className="bg-[var(--bg)] h-[92.6vh] w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="registerBg bg-[var(--border)] h-fit w-[35%] p-10 rounded-xl flex gap-6 flex-col"
      >
        <h2 className="self-center text-3xl font-bold tracking-wider text-[var(--text-h)] mb-4">
          Register
        </h2>
        <input
          {...register("username")}
          className="px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
          type="text"
          placeholder="UserName"
        />
        <input
          {...register("profile")}
          className="px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
          type="url"
          placeholder="Profile image URL"
        />
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
          Register
        </button>

        <p className="text-center text-[var(--text-p)]">
          Already have an account ?{" "}
          <span
            onClick={navigateHandler}
            className="text-[var(--text-h)] cursor-pointer active:scale-95"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
