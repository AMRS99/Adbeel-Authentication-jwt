import React, {useState,useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Signup = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const {store, actions} = useContext(Context)
    const navigate = useNavigate();


    const handleClick = () =>{
        actions.signUp(email,password)
    }

    useEffect(()=>{
        if(store.isSignUpSuccessful)
            navigate("/login")
    },[store.isSignUpSuccessful])

    return(

        <>
            <div className="signup text-center mt-5">
                <div className="heading"><h1>Signup</h1></div>
                <div>
                        <input
                             type="text"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleClick}>Signup</button>
                </div>
            </div>
        </>
    )
}

export default Signup;