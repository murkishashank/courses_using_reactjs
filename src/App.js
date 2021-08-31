// import logo from './logo.svg';
import './App.css';

function CreateCard(properties) {
	return (
		<div id="card" className="syllabusCard">
			<div id="cardBody" className="cardBody">
				<h2 className="cardTitle">{properties.syllabusData.title}</h2>
				<p className="cardDescription">{properties.syllabusData.description}</p>
				<ul id="nav" className="actionsNav alignRight">
					<li className="actionsNav-item">
						<a id="editbtn" href="{#}" onClick="edit()" className="actionsNav-link">Edit</a>
					</li>
					<li className="actionsNav-item">
						<a href="{#}" onClick="deleteSyllabus()" className="actionsNav-link">Delete</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

function CreateForm(properties) {
	return (
		<div id="form" name="formFields">
			<label htmlFor="syllabusTitle" className="textBoxLabel">Title</label>
			<input type="text" name="syllabusTitle" id="syllabusTitle" className="textBox" defaultValue={properties.syllabusData.title}/>
			<label htmlFor="syllabusDescription" className="textBoxLabel">Description</label>
			<input type="text" name="syllabusDescription" id="syllabusDescription" className="textBox" defaultValue={properties.syllabusData.description}/>
			<label htmlFor="syllabusTags" className="textBoxLabel">Tags</label>
			<input type="text" name="syllabusTags" id="syllabusTags" className="textBox" defaultValue={properties.syllabusData.tags}/>
			<button id="savebtn" className="alignRight formBtn" onClick="saveData()">Save</button>
			<button className="alignRight formBtn" onClick="cancel()">Cancel</button>
		</div>
	);
}

function App() {
	const syllabusList = [
		{
			title: "Week1",
			description: "Learn Python",
			tags: "Python",
			editMode: true
		},
		{
			title: "Week2",
			description: "Learn Python",
			tags: "Python",
			editMode: false
		}
	];
	return (
		<>
			{syllabusList.map((syllabusItem) => {
				if(syllabusItem.editMode){
					return <CreateCard key={1} syllabusData={syllabusItem}></CreateCard>
				}
				return <CreateForm key={2} syllabusData={syllabusItem}></CreateForm>
			})}
		</>
	);
}

export default App;