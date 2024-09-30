
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // Importar el icono de la basura


//create your first component
const user = "Gisela"

function Home() {
	const [tareas, setTareas] = useState([]);
	const [nuevaTarea, setNuevaTarea] = useState("");

	useEffect(() => {
		getTodos(user)
	},[])

	const getTodos = (user) => {
		fetch(`https://playground.4geeks.com/todo/users/${user}`, {
		}).then((response) => response.json()).then((data) => {
			console.log(data)
			setTareas(data.todos)
		})
	}

	const addToDo = (user, tarea) => {
		fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
			method:"POST",
			body: JSON.stringify(tarea),
			headers: {
				"Content-type": "application/json"
			}
		}).then((response) => response.json()).then((data) => {
			console.log(data);
			tarea.id = data.id
			setTareas([...tareas, tarea]);
			setNuevaTarea(""); //Limpiar el input
		})
	}

//Función para eliminar To Do
const deleteToDo = (id) => {
	fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
		method: "DELETE",
		headers: {
			"Content-type": "application/json"
		}
	}).then(() => {
		const nuevasTareas = tareas.filter((tareas) => tareas.id !== id);
		setTareas(nuevasTareas)
	})
}


	//Función para agregar tarea
	const handlerKeyDown = (e) => {
		if (e.key === "Enter" && nuevaTarea.trim() !== "") {
			let newTask = {"label": nuevaTarea, "is_done": false }
			addToDo(user, newTask)
		}
	};

	//Función para eliminar tarea por índice
	const eliminarTarea = (id) => {
		
		deleteToDo(id);
	};

	return (
		<div className="list">
			<h1><strong>To do list</strong></h1>
			<div className="input">
				<input type="text" placeholder="What needs to be done?"
				value={nuevaTarea}
				onChange={(e) => setNuevaTarea(e.target.value)} onKeyDown={handlerKeyDown} // Capturar el evento de "Enter"
				 />
			</div>

			<ul style={{ listStyleType: "none", padding: 0 }}>
				{tareas.map((tarea, index) => (
					<li key={tarea.id} style={{ margin: "10px 0" }}>
						{tarea.label}
						<button onClick={() => eliminarTarea(tarea.id)}>
							 <FontAwesomeIcon icon={faXmark} className="icon" /> </button></li>
				))}
			</ul>
				<div>{tareas.length} item left</div>

		</div>

	);
}

export default Home;
