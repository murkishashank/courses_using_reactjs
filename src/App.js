// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
// import './login.css'
import SignUp from './signup'
import SyllabusList from './syllabusList';
import Login from './login';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/syllabusList">
					<SyllabusList />
				</Route>
				<Route path="/signup">
					<SignUp />
				</Route>
			</Switch>
		</Router>
			
	);
}

export default App;