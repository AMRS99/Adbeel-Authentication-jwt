import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Navbar = () => {
	const {store,actions} = useContext(Context)
	const navigate = useNavigate();
	const handleLogout = () =>{
		actions.logout;
	}
		useEffect(()=>{
			if(store.token && store.token!="" && store.token != undefined)
				navigate("/private")
			else{
				navigate("/login")
			}
		},[store.token])
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				<div>
					<button onClick={handleLogout}>LogOut</button>
				</div>
			</div>
		</nav>
	);
};
