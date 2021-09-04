import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
// import './login.css'
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
			</Switch>
		</Router>
			
	);
}

export default App;