import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { asyncDeleteUser, asyncLogoutUser, asyncUpdateUser } from "../../store/userActions.jsx";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
const UserProfile = () => {
  const currUser = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  
  useEffect(() => {
    if (currUser) {
      reset({
        username: currUser?.username,
        profile: currUser?.profile,
        email: currUser?.email,
      });
    }
  }, [currUser, reset]);

  const updateUserHandler = (user) => {
    user.id = currUser.id;
    console.log(user);
    dispatch(asyncUpdateUser(user, user.id));
    toast.success("Profile updated Succesfully");
  };

  const deleteUserHandler = () => {
    dispatch(asyncDeleteUser(currUser.id));
    navigate("/login");
  };

  const logoutUserHandler = () =>{
    dispatch(asyncLogoutUser());
    navigate("/login");
  }

  return (
    <div className="userProfileDiv w-full">
      <h1 className="profileHeading capitalize text-4xl text-[var(--text-h)] text-center mt-10 font-bold tracking-widest">
        Personal Information
      </h1>
      <div className="prfileInfo w-full h-full flex">
        <div className="profileLeft w-[40%] h-fit flex flex-col items-center gap-6 ">
        <img src={currUser?.profile} alt="profile image" className="mt-10 w-[53%] h-[50%] object-cover overflow-hidden rounded-full "/>
        <h1 className="text-4xl text-[var(--text-h)]">{currUser?.username}</h1>
        <h2 className="text-2xl text-[var(--text-p)]">{currUser?.email}</h2>
        <button onClick={logoutUserHandler} className="hover:scale-99 w-[48%] bg-red-300 p-3 iteam-center   rounded-md text-xl active:scale-98 text-[var(--btn-t)] tracking-wide mt-4 cursor-pointer flex items-center justify-center gap-3 pl-2">
              <i className=" ri-logout-box-r-line"></i>
              Logout
            </button>
        </div>
        <form
          onSubmit={handleSubmit(updateUserHandler)}
          className="userInfo w-[60%] p-10 flex gap-10 flex-col mt-5"
        >
          <div className="userInfoInput w-full flex justify-between items-center">
            <h2 className="text-2xl text-[var(--text-h)]">User Name :</h2>
            <input
              {...register("username")}
              className="w-[70%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
              type="text"
            />
          </div>
          <div className="userInfoInput w-full flex justify-between items-center">
            <h2 className="text-2xl text-[var(--text-h)]">Image URL :</h2>
            <input
              {...register("profile")}
              className="w-[70%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
              type="text"
            />
          </div>
          <div className="userInfoInput w-full flex justify-between items-center">
            <h2 className="text-2xl text-[var(--text-h)]">Email :</h2>
            <input
              {...register("email")}
              className="w-[70%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
              type="text"
            />
          </div>
          <div className="userInfoInput w-full flex justify-between items-center">
            <h2 className="text-2xl text-[var(--text-h)]">Password :</h2>
            <input
              {...register("password")}
              placeholder="************"
              className="w-[70%] px-5 py-3 outline-0 border-2 rounded-md text-xl text-[var(--text-p)]"
              type="text"
            />

          </div>

          <div className=" w-full flex items-center justify-between">
            <button className="profileBtn hover:scale-99 w-[48%] bg-[var(--btn)] p-3 flex iteam-center  justify-center rounded-md text-xl active:scale-98 text-[var(--btn-t)] tracking-wide mt-4 cursor-pointer">
              Update Profile
            </button>
            <button onClick={deleteUserHandler} className="profileBtn hover:scale-99 w-[48%] bg-red-400 p-3 flex iteam-center  justify-center rounded-md text-xl active:scale-98 text-[var(--btn-t)] tracking-wide mt-4 cursor-pointer">
              <i className="mr-3 ri-delete-bin-6-line"></i>
              Delete Account
            </button>
          </div>
        </form>
      </div>
      <div className="themeDiv h-[12vh] w-full flex items-center  px-10 justify-between  p-3 h-fit">
        <h1 className="themeH1 text-4xl font-bold text-[var(--text-h)] ml-30 ">Theme</h1>
        <h1 className="themeColon text-4xl font-bold text-[var(--text-h)] ml-30 ">:</h1>
      <div className=" flex items-center gap-4">
        <ThemeSwitcher/>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;
