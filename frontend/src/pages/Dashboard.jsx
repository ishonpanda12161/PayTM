import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect } from "react";
import axios from "axios";

export const Dashboard = ()=> {
    const [bal,setBal] = useState(0);

        useEffect(()=>{
           async function getbalance(){
            const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{Authorization:"Bearer "+localStorage.getItem("token")}
            });
        setBal(res.data.BalanceAvailable);
           }

           getbalance();
        },[]);
        
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={bal} />
            <Users />
        </div>

    </div>
}