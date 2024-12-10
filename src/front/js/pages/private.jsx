import React, {useEffect,useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Private = () =>{

    const {store,actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(()=>{
        if(store.token && store.token!="" && store.token != undefined)
            navigate("/private")
        navigate("/login")
    },[store.token])

    return(
        <>
            Private
            <div>
                <button onClick={()=>{actions.logout}}>LogOut</button>
            </div>
        </>
    )
}

export default Private