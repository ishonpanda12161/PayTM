import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastname] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation"} />
        <InputBox onChange={setFirstName} placeholder="John" label={"First Name"} />
        <InputBox onChange={setLastname} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={setUserName} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={setPassword} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
                 try {
                  const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName: firstname,
                    lastName: lastname,
                    password
                  });
              
                  console.log(response.data.token);
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (err) {
                  console.log("Error:", err);
                }
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}