import { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUp() {
	const history = useHistory();
	const [signUpData, setSignUpData] = useState({"userName":"","email":"", "password":""});
	
	const handleSubmit = () => {
		fetch("http://localhost:3001/api/signup/", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(signUpData)
		})
		.then(response => response.json())
		.then(result => {
			if(result.status === 404) {
				alert("invalid")
			}
			else {
				console.log(result);
				window.sessionStorage.setItem('Token', result.token);
				history.push('/SyllabusList');
			}
		})
	}
	
	const handleChange = event => {
		if(event.target.name === "username") signUpData["userName"] = event.target.value;
		if(event.target.name === "email") signUpData["email"] = event.target.value;
		if(event.target.name === "password") signUpData["password"] = event.target.value;
		setSignUpData(signUpData);
	}
	return (
		<div className="login">
			<label>User Name</label>
			<input type="text" name="username" placeholder="Enter your name" onChange={handleChange}/><br/>
			<label>E-Mail ID</label>
			<input type="email" name="email" placeholder="Enter your email id" onChange={handleChange}/><br/>
			<label>Password</label>
			<input type="password" name="password" id="password" placeholder="Enter your password" onChange={handleChange}/>
			<button type="submit" name="submit" onClick={handleSubmit}>Submit</button>
			<p className="errorMessage"></p>
		</div>
    );
}

export default SignUp