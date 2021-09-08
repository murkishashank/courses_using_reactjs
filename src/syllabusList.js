import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import "@ui5/webcomponents/dist/MultiInput";
import { Button, Input, MultiInput, SuggestionItem } from '../node_modules/@ui5/webcomponents-react';
import './App.css';
import Loader from "react-js-loader";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

function SyllabusCard(properties) {
	const title = properties.syllabusData.Title;
	const description = properties.syllabusData.Description;
	const index = properties.index + 1;
	const editSyllabus = () => {
		properties.onEdit(properties.index);
	}
	const deleteSyllabus = () => {
		properties.onDelete(properties.index);
	}
	return (
		<div id="card" className="syllabusCard">
			<div id="cardBody" className="cardBody">
				<div id="anchorDiv">
					<a className="index">Syllabus {index}</a>
				</div>
				<h2 className="cardTitle">{title}</h2>
				<p className="cardDescription">{description}</p>
				<ul id="nav" className="actionsNav alignRight">
					<li className="actionsNav-item">
						<Button id="editbtn" onClick={editSyllabus} className="actionsNav-link">Edit</Button>
					</li>
					<li className="actionsNav-item">
						<Button onClick={deleteSyllabus} className="actionsNav-link">Delete</Button>
					</li>
				</ul>
			</div>
		</div>
	);
}

function SyllabusForm(properties) {
	const title = properties.syllabusData.Title;
	const description = properties.syllabusData.Description;
	var tags = properties.syllabusData.Tags;
	const index = properties.index + 1;
	const [formData, setFormData] = useState({title:title, description:description, tags:tags, index:properties.index});
	const [objectives, setObjectives] = useState([tags]);

	const submitForm = () => properties.onClickSave(JSON.stringify(formData));
	
	const  changeHandler = event => {
		const value = event.target.value;
		const name = event.target.name;
		if(name === "syllabusTitle") {
			formData["title"] = value;
			if(formData["title"] === "") {
				event.target.valueState = "Error";
			}
		}
		if(name === "syllabusDescription") {
			formData["description"] = value;
			if(formData["description"] === "") {
				event.target.valueState = "Error";
			}
		}
		
		if(name === "syllabusTags") {
			const objectivesClone = [...objectives];
			objectivesClone.push(value);
			setObjectives(objectivesClone);
			const token = document.createElement('ui5-token');
			token.setAttribute("text", value);
			token.setAttribute("slot", "tokens");
			token.setAttribute("ui5-token", "");
			event.target.appendChild(token);
			event.target.value = "";
			formData["tags"] = objectives;
		}
		setFormData(formData);
	}
	
	const cancel = () => {
		properties.onCancel(properties.index);
	}
	
	const deleteToken = event => {
		const oToken = event.detail.token;
		oToken.parentElement.removeChild(oToken);
	}

	return (
		<div id="form" name="formFields">
				<div className="formIndex">
					<a className="index" id="index">Syllabus {index}</a>
				</div>
				<label htmlFor="syllabusTitle" className="textBoxLabel">Title</label>
				<Input type="text" name="syllabusTitle" id="syllabusTitle" className="textBox" value={title} onChange={changeHandler} required/>
				<p className="errorMessage">{properties.syllabusData.titleError}</p>
				<label htmlFor="syllabusDescription" className="textBoxLabel">Description</label>
				<Input type="text" name="syllabusDescription" id="syllabusDescription" className="textBox" value={description} onChange={changeHandler} required/>
				<p className="errorMessage">{properties.syllabusData.descriptionError}</p>
				<label htmlFor="syllabusTags" className="textBoxLabel">Tags</label>
				<MultiInput showSuggestions name="syllabusTags" className="textBox" onChange={changeHandler} onInput={function noRefCheck(){}} onTokenDelete={deleteToken} required slot="" style={{ width: '400px' }}  tooltip="" value={tags}>
					<SuggestionItem text="C" />
					<SuggestionItem text="ReactJS" />
				</MultiInput>
				<p className="errorMessage">{properties.syllabusData.tagsError}</p>
				<Button id="savebtn" className="alignRight formBtn" type="submit" onClick={submitForm}>Save</Button>
				<Button className="alignRight formBtn" onClick={cancel}>Cancel</Button>
		</div>
	);
}

function SyllabusList() {
	const [syllabusList, setSyllabusList] = useState([]);
	const [loading, setLoading] = useState(true)
	const [isEditing, setisEditing] = useState(false);
	const [userName, setUserName] = useState('Login');
	const history = useHistory();
	
    useEffect(() => {
        const token = window.sessionStorage.getItem('Token')
        if(token === null){
			history.push('./');
		}
		else{
			fetch("http://localhost:3001/api/getUserName", {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
			.then(response => response.json())
			.then(result => {
				setUserName(result.UserName)
			});
			fetch("http://localhost:3001/api/course", {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
			.then(response => response.json())
			.then(result =>{
				result.forEach(item => {
					item["editMode"] = false;
					item["titleError"] = "";
					item["descriptionError"] = "";
					item["tagsError"] = "";
				});
				setSyllabusList(result);
				setLoading(false);
			})
			.catch(console.log);
		}
	}, [])

	const addSyllabus = (event) => {
		const syllabusListClone = [...syllabusList]
		syllabusListClone.push({Title: "", Description: "", Tags: "Java", editMode: true, titleError: "", descriptionError: "", tagsError: ""})
		setSyllabusList(syllabusListClone);
	}

	const edit = index => {
		const syllabusListClone = [...syllabusList]
		syllabusListClone[index].editMode = true
		setisEditing(false);
		setSyllabusList(syllabusListClone);
	}
	
	const deleteSyllabus = index => {
		const syllabusListClone = [...syllabusList]
		const id = syllabusList[index].id;
		fetch(`http://localhost:3001/api/syllabus/${id}`, {
			method: "DELETE",
			headers: {
				'Authorization': window.sessionStorage.getItem('Token')
			}
		})
		.then(response => response.json())
		.then(result => {
			syllabusListClone.splice(index,1);
			setSyllabusList(syllabusListClone);
			console.log(result)
		})
		.catch(console.log)
	}

	async function postData (url, data, method) {
		const response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.sessionStorage.getItem('Token')
			},
			body: JSON.stringify(data)
		});
		return response;
	}
	
	const saveData = formData => {
		formData = JSON.parse(formData);
		const syllabusListClone = [...syllabusList]
		const title = formData.title;
		const description = formData.description;
		const tags = formData.tags;
		const index = formData.index;
		syllabusListClone[index] = {Title:title, Description:description, Tags:tags, editMode: false, titleError:"", descriptionError:"", tagsError:""}
		if(title === "" || description === "" || tags === "") {
			syllabusListClone[index]["editMode"] = true;
			if(title === "") syllabusListClone[index].titleError = "Title is required.";
			if(description === "") syllabusListClone[index].descriptionError = "Description is required.";
			if(tags === "") syllabusListClone[index].tagsError = "Tags are required.";
		}else {
			if(!isEditing) {
				const id = syllabusList[index].id;
				postData(`http://localhost:3001/api/syllabus/${id}`, {"title":title,"description":description,"tags":tags}, 'PUT')
				.then(response => response.json())
				.then(result => {syllabusListClone[index] = result;})
				.catch(console.log);
				setisEditing(true);
			}
			else {
				postData("http://localhost:3001/api/syllabus", {"title":title,"description":description,"tags":tags}, 'POST')
				.then(response => response.json())
				.then(result => {syllabusListClone[index] = result;})
				.catch(console.log);
			}
		}
		setSyllabusList(syllabusListClone);
	}
	
	const cancel = index => {
		const syllabusListClone = [...syllabusList]
		const syllabusItemClone = syllabusListClone[index]
		if((syllabusItemClone["title"] === "") || (syllabusItemClone["description"] === "") || (syllabusItemClone["tags"]  === "")) {
			syllabusListClone.splice(index, 1);
		}
		else{
			syllabusItemClone["editMode"]= false;
		}
		setSyllabusList(syllabusListClone);
	}

	const logout = () => {
		window.sessionStorage.clear();
		history.push('./')
	}

	return (
		<>
			<div className="dropdown alignRight logout-btn">
				<p className="dropbtn" href="login.php">Hello, {userName}</p>
				<div className="dropdown-content">
					<a onClick={logout}>Logout</a>
				</div>
			</div>
			<Button className="addSyllabus" id="addSyllabus" onClick={addSyllabus}>Add Syllabus</Button>
			{loading ? <Loader type="spinner-circle" bgColor={"#000"} title={"box-rotate-x"} size={100} /> : ''}
			{syllabusList.map((syllabusItem, index) => {
				if(syllabusItem.editMode){
					return <SyllabusForm key={index} index={index} syllabusData={syllabusItem} onClickSave={saveData} onCancel={cancel}></SyllabusForm>
				}
				return <SyllabusCard key={index} index={index} syllabusData={syllabusItem} onEdit={edit} onDelete={deleteSyllabus}></SyllabusCard>
			})}
		</>
	);
}

export default SyllabusList;