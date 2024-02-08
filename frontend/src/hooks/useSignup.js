import React, {  useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {toast}from "react-hot-toast"

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser}=useAuthContext()

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const sucess = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    setLoading(true)
    if (!sucess) return;

    try {
        const res=await fetch("/api/auth/signup",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                fullName,
                username,
                password,
                confirmPassword,
                gender,
              })
        })
        const data=await res.json()
        if(data.error){
            throw new Error(data.error)
        }
        localStorage.setItem("chat-user",JSON.stringify(data))
        setAuthUser(data)
        // console.log(data);

    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
  };

  return {loading,signup}
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("please all the field");
    return false;
  }
  if(password !== confirmPassword){
    toast.error("Password do not match")
    return false
  }
  if(password.length<6){
    toast.error("password should be grether than 6 letters")
  }
  return true
}
