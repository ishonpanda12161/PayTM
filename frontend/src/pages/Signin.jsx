import { useNavigate, useSearchParams } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios";
export const Signin = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials"} />
        <InputBox onChange={setUsername} placeholder="example@gmail.com" label={"Email"} />
        <InputBox onChange={setPassword} placeholder="password" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            try{
              const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                
                  username:username,
                  password:password
                
              });

              localStorage.setItem("token",response.data.token);
              navigate("/dashboard");
            }
            catch(err){
              console.log("Error "+err);
            }
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}