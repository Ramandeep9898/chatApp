import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  allUserRoute,
  sendMessageRoute,
  getAllMessagesRoute,
  host,
} from "../Utils/APIRoutes";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { io } from "socket.io-client";

import { v4 as uuidv4 } from "uuid";

export const UserSidebar = () => {
  const socket = useRef();
  const scrollRef = useRef();

  const navigate = useNavigate();

  const [message, setMessage] = useState([]);
  const [contact, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [inputMessage, setInputMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(undefined);

  useEffect(() => {
    const checkUser = async () => {
      !localStorage.getItem("chat-app-user")
        ? navigate("/login")
        : setCurrentUser(
            await JSON.parse(localStorage.getItem("chat-app-user"))
          );
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedChat) {
      const getAllMsg = async () => {
        const data = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: selectedChat._id,
        });
        setMessage(data.data);
      };
      getAllMsg();
    }
  }, [selectedChat]);

  const setSelectedChatHandler = (id) => {
    setSelectedChat(contact.find((ele) => ele._id === id));
  };

  const sendMessage = async () => {
    if (inputMessage.length > 0) {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: selectedChat._id,
        message: inputMessage,
      });

      socket.current.emit("send-msg", {
        from: currentUser._id,
        to: selectedChat._id,
        message: inputMessage,
      });

      const msgs = [...message];
      msgs.push({ fromSelf: true, message: inputMessage });
      setMessage(msgs);
      setInputMessage("");
    }
  };

  const logout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };

  useEffect(() => {
    const checkAvatarImage = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };

    checkAvatarImage();
  }, [currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <main className="flex">
        <section className=" bg-gray-50 w-[500px] h-screen">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* <div className="max-w-lg mx-auto text-left sm:text-center"></div> */}

            <div className=" mx-auto">
              <div className=" flex flex-col h-screen justify-between">
                <div className="divide-y divide-gray-200">
                  {contact.map((contactInfo) => {
                    return (
                      <div
                        key={contactInfo._id}
                        onClick={() => setSelectedChatHandler(contactInfo._id)}
                        className="relative py-6 group sm:flex sm:items-center cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-[80px] h-[80px] overflow-hidden rounded-2xl">
                          <img
                            className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12"
                            src={`data:image/svg+xml;base64,${contactInfo.avatarImage}`}
                            alt=""
                          />
                        </div>
                        <div className="mt-8 sm:mt-0 sm:ml-10">
                          <p className="text-lg font-medium text-gray-900 font-pj">
                            {contactInfo.username}
                          </p>
                          <p className="mt-1 text-sm font-normal text-gray-600 font-pj">
                            hello my love
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {currentUser && (
                  <div className="relative py-6 group sm:flex sm:items-center">
                    <div className="flex-shrink-0 w-[80px] h-[80px] overflow-hidden rounded-2xl">
                      <img
                        className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12"
                        src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="mt-8 sm:mt-0 sm:ml-10">
                      <p className="text-lg font-medium text-gray-900 font-pj">
                        {currentUser.username}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="space-y-10">
            <header className="relative">
              <div className="bg-white border-b border-gray-200">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                  <div className="flex justify-between h-16 lg:h-[72px]">
                    {selectedChat && (
                      <div className="flex items-center flex-shrink-0 -m-1 gap-[10px]">
                        <img
                          className="w-[50px]"
                          src={`data:image/svg+xml;base64,${selectedChat.avatarImage}`}
                          alt=""
                        />

                        <p class="inline-flex items-center font-sans text-sm font-medium text-gray-900 transition-all duration-200 border-b-2 border-transparent xl:text-base">
                          {selectedChat.username}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-end ml-auto space-x-6">
                      <button
                        type="button"
                        onClick={logout}
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>

          <div className=" h-[90%] flex flex-col">
            <section className="w-full overflow-y-scroll h-[32px] grow chat-container">
              {message.map((msg) => (
                <div
                  ref={scrollRef}
                  key={uuidv4()}
                  className={msg.fromSelf ? "send" : ""}
                >
                  <h1 className="message-left">{msg.message}</h1>
                </div>
              ))}
            </section>

            <div className="border-t border-gray-200 w-full px-[32px] py-[24px] flex flex-row items-center ">
              {emojiPicker && (
                <div className="absolute bottom-[70px] left-[30px] ">
                  <Picker
                    onEmojiClick={(emojiObject) =>
                      setInputMessage((prevMsg) => prevMsg + emojiObject.emoji)
                    }
                  />
                </div>
              )}

              <div className="">
                <BsEmojiSmile onClick={() => setEmojiPicker((prev) => !prev)} />
              </div>
              <input
                type="text"
                placeholder="Message"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="border grow px-[16px] py-[8px] rounded-[8px] border-gray-200"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="inline-flex  ml-[16px] items-center justify-center px-6 py-3 text-sm font-semibold leading-[1rem] text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
