const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			loginMSG: null,
			signUpMSG: null,
			isloginSuccessful: false,
			isSignUpSuccessful: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			login: async(email,password) => {
				const options = {
					method:"POST",
					mode:'cors',
					headers:{
						'Content-Type':'application/json'
					},
					body: JSON.stringify({
						email:email,
						password:password
					})
				}


				const response = await fetch("https://ideal-space-invention-v6grj9g6xxgpc694r-3001.app.github.dev/api/token", options)
				if(!response.ok){
					console.log("Error:",response.statusText,response.status)
					return false;
				}
				const data = await response.json();
				console.log('this came from the backend',data);
				sessionStorage.setItem("token", data.access_token)
				setStore({
					token:data.access_token,
					loginMSG: data.msg,
					isloginSuccessful: true
				})
				return true;
			},

			signUp: async (email,password) =>{
				const options={
					method:"POST",
					mode:'cors',
					headers:{
						'Content-Type':'application/json'
					},
					body: JSON.stringify({
						email:email,
						password:password
					})
				}
				const response = await fetch("https://ideal-space-invention-v6grj9g6xxgpc694r-3001.app.github.dev/api/signup", options)
				if(!response.ok){
					const data = await response.json()
					return {
						error:{
							status: response.status,
							statusText:response.statusText,
							signUpMSG:data.msg
						}
					}
				}
				const data = await response.json()
				setStore({
					signUpMSG: data.msg,
					isSignUpSuccessful: true
				})
				return data
			},
			synSessionTokenFromStore:() => {
				const sessionToken= sessionStorage.getItem("token");
				if(sessionToken && sessionToken!="" && sessionToken != undefined){
					setStore({token:sessionToken})
				}
			},
			logout:() => {
				sessionStorage.removeItem("token")
				setStore({
					token: null,
					loginMSG: null,
					signUpMSG: null,
					isloginSuccessful: false
				})
			}
		}
	};
};

export default getState;
