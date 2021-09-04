import { useState } from "react";
import SyllabusList from "./syllabusList";
import { useHistory } from "react-router-dom";
// import {Redirect, Route } from "react-router-dom";

function Login() {
	const history = useHistory();
	const [loginData, setLoginData] = useState({"email":"", "password":""});
	const [loginStatus, setLoginStatus] = useState(false);
	
	const handleSubmit = () => {
		fetch("http://localhost:3001/api/login/", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData)
		})
		.then(response => response.json())
		.then(result => {
			if(result.error == "Invalid Credentials.") {
				alert("invalid")	
			}
			else {
				console.log(result);
				window.sessionStorage.setItem('Token', result.token);
				setLoginStatus(true);
				history.push('/SyllabusList');
			}
		})
	}
	
	const handleChange = event => {
		if(event.target.name === "email") loginData["email"] = event.target.value;
		if(event.target.name === "password") loginData["password"] = event.target.value;
		setLoginData(loginData);
	}
	return (
		<div className="login">
			<label>E-Mail ID</label>
			<input type="email" name="email" placeholder="Enter your email id" onChange={handleChange}/><br/>
			<label>Password</label>
			<input type="password" name="password" id="password" placeholder="Enter your password" onChange={handleChange}/>
			<button type="submit" name="submit" onClick={handleSubmit}>Submit</button>
			<p className="errorMessage"></p>
		</div>
    );
}

export default Login