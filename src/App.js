import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function SyllabusCard(properties) {
	const title = properties.syllabusData.title;
	const description = properties.syllabusData.description;
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
						<a id="editbtn"	onClick={editSyllabus} className="actionsNav-link">Edit</a>
					</li>
					<li className="actionsNav-item">
						<a onClick={deleteSyllabus} className="actionsNav-link">Delete</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

function SyllabusForm(properties) {
	const title = properties.syllabusData.title;
	const description = properties.syllabusData.description;
	const tags = properties.syllabusData.tags;
	const index = properties.index + 1;
	const [formData, setFormData] = useState({title:title, description:description, tags:tags, index:properties.index});
	const handleSubmit = () => {
		properties.onClickSave(JSON.stringify(formData));
	}
	const  changeHandle = event => {
		if(event.target.name === "syllabusTitle") {
			formData["title"] = event.target.value;
		}
		if(event.target.name === "syllabusDescription") {
			formData["description"] = event.target.value;
		}
		if(event.target.name === "syllabusTags") {
			formData["tags"] = event.target.value;
		}
		setFormData(formData);
	}
	const cancel = () => {
		properties.onCancel(properties.index);
	}
	return (
		<div id="form" name="formFields">
				<div className="formIndex">
					<a className="index" id="index">Syllabus {index}</a>
				</div>
				<label htmlFor="syllabusTitle" className="textBoxLabel">Title</label>
				<input type="text" name="syllabusTitle" id="syllabusTitle" className="textBox" defaultValue={title} onChange={changeHandle}/>
				<p className="errorMessage">{properties.syllabusData.titleError}</p>
				<label htmlFor="syllabusDescription" className="textBoxLabel">Description</label>
				<input type="text" name="syllabusDescription" id="syllabusDescription" className="textBox" defaultValue={description} onChange={changeHandle}/>
				<p className="errorMessage">{properties.syllabusData.descriptionError}</p>
				<label htmlFor="syllabusTags" className="textBoxLabel">Tags</label>
				<input type="text" name="syllabusTags" id="syllabusTags" className="textBox" defaultValue={tags} onChange={changeHandle}/>
				<p className="errorMessage">{properties.syllabusData.tagsError}</p>
				<button id="savebtn" className="alignRight formBtn" type="submit" onClick={handleSubmit}>Save</button>
				<button className="alignRight formBtn" onClick={cancel}>Cancel</button>
		</div>
	);
}

function App() {
	const [syllabusList, setSyllabusList] = useState([]);
	const [isEditing, setisEditing] = useState(false);
	useEffect(() => {
		fetch("http://localhost:3000/api/course", {
			// mode: 'no-cors',
			// credentials: 'same-origin',
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "1d8a43d2-581f-48f1-8b9a-09ddd41eb420"
			}
		})
			.then(response => response.json())
			.then(result =>{
				console.log(result);
				const syllabusListClone = [...syllabusList];
				syllabusListClone.push(result);
				setSyllabusList(syllabusListClone);
				console.log(syllabusList);
			})
			.catch(error => {
				console.log(error);
			});
	}, [])
	const addSyllabus = (event) => {
		const syllabusListClone = [...syllabusList]
		syllabusListClone.push({
			title: "",
			description: "",
			tags: "",
			editMode: true,
			titleError: "",
			descriptionError: "",
			tagsError: ""
		})
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
		index = 20058;
		fetch(`http://localhost:3000/api/syllabus/${index}`, {
			method: "DELETE",
			headers: {
				'Authorization': "1d8a43d2-581f-48f1-8b9a-09ddd41eb420"
			}
		})
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(console.log)
		syllabusListClone.splice(index,1);
		setSyllabusList(syllabusListClone);
	}

	async function postData (url, data, method) {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "1d8a43d2-581f-48f1-8b9a-09ddd41eb420"
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
		syllabusListClone[index] = {title:title, description:description, tags:tags, editMode: false, titleError:"", descriptionError:"", tagsError:""}
		if(title === "" || description === "" || tags === "") {
			syllabusListClone[index]["editMode"] = true;
			if(title === "") {
				syllabusListClone[index].titleError = "Title is required.";
			}
			if(description === "") {
				syllabusListClone[index].descriptionError = "Description is required.";
			}
			if(tags === "") {
				syllabusListClone[index].tagsError = "Tags are required.";
			}
		}else {
			if(!isEditing) {
				alert("Editing");
				postData(`http://localhost:3000/api/syllabus/${index}`, {"title":title,"description":description,"tags":tags})
				.then(response => console.log(response));
				setisEditing(true)
			}
			else {
				alert("Not Editing");
				postData("http://localhost:3000/api/syllabus", {"title":title,"description":description,"tags":tags})
				.then(response => console.log(response));
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

	return (
		<>
			<button className="addSyllabus" id="addSyllabus" onClick={addSyllabus}>Add Syllabus</button>
			{syllabusList.map((syllabusItem, index) => {
				if(syllabusItem.editMode){
					return <SyllabusForm key={index} index={index} syllabusData={syllabusItem} onClickSave={saveData} onCancel={cancel}></SyllabusForm>
				}
				return <SyllabusCard key={index} index={index} syllabusData={syllabusItem} onEdit={edit} onDelete={deleteSyllabus}></SyllabusCard>
			})}
		</>
	);
}

export default App;