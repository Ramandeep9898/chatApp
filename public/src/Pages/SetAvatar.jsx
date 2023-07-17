import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../Utils/APIRoutes";
import "../style/setAvatar/set-avatar.css";
import loader from "../assets/loader.gif";

export const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    async function fetchMyAPI() {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));

        setAvatars(data);
        setIsLoading(false);
      }
    }
    fetchMyAPI();
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <div className="flex-center h-screen ">
      {isLoading ? (
        <img src={loader} className=" loader" />
      ) : (
        <>
          <div className="set-avatar-container flex-center">
            <h1 className="set-avatar-heading mb-[16px] text-[24px] font-[700]">
              Select an Avatar that Suits you :)
            </h1>
            <div className="flex-row mb-[32px]">
              {avatars.map((avatar, i) => {
                return (
                  <div
                    className={
                      selectedAvatar === i
                        ? "selected-avatar set-avatar-img"
                        : "set-avatar-img"
                    }
                    key={i}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt=""
                      onClick={() => setSelectedAvatar(i)}
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              onClick={setProfilePicture}
              className="inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              Set as Profile Picture
            </button>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};
