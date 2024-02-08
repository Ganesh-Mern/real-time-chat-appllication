import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(()=>{
    return ()=>setSelectedConversation(null)
  },[setSelectedConversation])
  return (
    <div className="md:min-w-[450px] flex flex-col   backdrop-filter backdrop-blur-lg shadow-lg border-r-2 ">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-sky-300 px-4 py-2 mb-2">
            <span className="label-text text-white font-bold">To :</span>{" "}
            <span className="text-black font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const {authUser}=useAuthContext()
  return (
    <div className=" flex items-center justify-center w-full h-full   backdrop-filter backdrop-blur-lg shadow-lg">
      <div className="px-4 text-center sm:text-lg md:text-xl  text-gray-200 font-semibold flex items-center gap-2 flex-col">
        <p>Welcome {authUser.fullName}</p>
        <p>Select a chat to messaging</p>
        <TiMessages className=" text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
