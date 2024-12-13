import React, {useState, useContext, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";


const Login = () =>{

    const navigate = useNavigate();
    const {store, actions} = useContext(Context);
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");


    const handleClick = () =>{
        actions.login(email,password)
    }

    useEffect(()=>{
        if(store.isloginSuccessful)
            navigate("/private")
    },[store.isloginSuccessful])

    return(
        <>
            <div className="text-center mt-5">
                
                    <>
                        <h1>Login</h1>
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
                            <button onClick={handleClick}>Login</button>
                        </div>
                    </>
                
            </div>
        </>
    );
}

export default Login;