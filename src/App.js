// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function CreateCard(properties) {
	const title = properties.syllabusData.title;
	const description = properties.syllabusData.description;
	const index = properties.index + 1;
	return (
		<div id="card" className="syllabusCard">
			<div id="cardBody" className="cardBody">
				<div id="anchorDiv">
					<a className="index" href="{#}">Syllabus {index}</a>
				</div>
				<h2 className="cardTitle">{title}</h2>
				<p className="cardDescription">{description}</p>
				<ul id="nav" className="actionsNav alignRight">
					<li className="actionsNav-item">
						<a id="editbtn" href="{#}" onClick={"edit"} className="actionsNav-link">Edit</a>
					</li>
					<li className="actionsNav-item">
						<a href="{#}" onClick={"deleteSyllabus"} className="actionsNav-link">Delete</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

function CreateForm(properties) {
	const title = properties.syllabusData.title;
	const description = properties.syllabusData.description;
	const tags = properties.syllabusData.tags;
	const index = properties.index + 1;
	const formData = {title:title, description:description, tags:tags};
	const mySubmitHandler = () => {
		alert(JSON.stringify(formData))
	}
	const  myChangeHandler = (key, value) => {
		formData[key] = value;
	}
	return (
		<div id="form" name="formFields">
			<div className="formIndex">
				<a className="index" id="index" href="{#}">Syllabus {index}</a>
			</div>
			<label htmlFor="syllabusTitle" className="textBoxLabel">Title</label>
			<input type="text" name="syllabusTitle" id="syllabusTitle" className="textBox" defaultValue={title} onChange={(event) => myChangeHandler("title", event.target.value)}/>
			<label htmlFor="syllabusDescription" className="textBoxLabel">Description</label>
			<input type="text" name="syllabusDescription" id="syllabusDescription" className="textBox" defaultValue={description} onChange={(event) => myChangeHandler("description", event.target.value)}/>
			<label htmlFor="syllabusTags" className="textBoxLabel">Tags</label>
			<input type="text" name="syllabusTags" id="syllabusTags" className="textBox" defaultValue={tags} onChange={(event) => myChangeHandler("tags", event.target.value)}/>
			<button id="savebtn" className="alignRight formBtn" type="submit" onClick={mySubmitHandler}>Save</button>
			<button className="alignRight formBtn" onClick="cancel()">Cancel</button>
		</div>
	);
}

function App() {
	const [syllabusList, setSyllabusList] = useState([]);
	const addSyllabus = (event) => {
		const syllabusListClone = [...syllabusList]
		syllabusListClone.push({
			title: "Week 1",
			description: "Learn Python",
			tags: "Python",
			editMode: false
		})
		setSyllabusList(syllabusListClone);
	}

	const edit = index => {
		const syllabusListClone = [...syllabusList]
		syllabusListClone[index].editMode = true
		setSyllabusList(syllabusListClone);
	}

	const deleteSyllabus = index => {
		const syllabusListClone = [...syllabusList]
		syllabusListClone.splice(index,1);
		setSyllabusList(syllabusListClone);
	}

	return (
		<>
			<button className="addSyllabus" id="addSyllabus" onClick={addSyllabus}>Add Syllabus</button>
			<button className="addSyllabus" id="addSyllabus" onClick={(event) =>edit(0)}>Edit</button>
			<button className="addSyllabus" id="addSyllabus" onClick={(event) =>deleteSyllabus(0)}>Delete</button>
			{syllabusList.map((syllabusItem, index) => {
				if(syllabusItem.editMode){
					return <CreateForm key={index} index={index} syllabusData={syllabusItem}></CreateForm>
				}
				return <CreateCard key={index} index={index} syllabusData={syllabusItem}></CreateCard>
			})}
		</>
	);
}

export default App;