import { useState } from "react";
import { useHistory } from "react-router-dom";
import './login.css';

function Login() {
	const history = useHistory();
	const [loginData, setLoginData] = useState({"email":"", "password":""});
	
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
			if(result.error === "Invalid Credentials.") {
				alert("invalid")	
			}
			else {
				window.sessionStorage.setItem('Token', result.token);
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
			<label className="fieldNames">E-Mail ID</label>
			<input type="email" name="email" placeholder="Enter your email id" className="inputBox" onChange={handleChange}/><br/>
			<label className="fieldNames">Password</label>
			<input type="password" name="password" id="password" placeholder="Enter your password" className="inputBox" onChange={handleChange}/>
			<button type="submit" name="submit" onClick={handleSubmit}>Submit</button><br/>
			<a href="./signup">Create an account?</a><br/>
			<p className="errorMessage"></p>
		</div>
    );
}

export default Login