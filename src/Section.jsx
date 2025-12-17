import React, {useState} from 'react'
import './section.css'

function Section(){
    
    const [tasks, setTasks] = useState([]);

    function addTask(event){
        const newTask = document.getElementById("taskInput").value;
        document.getElementById("taskInput").value = "";
        setTasks([...tasks, newTask]);
        
    }

    function removeTask(index){
        setTasks(tasks.filter((__,i) => i != index));
    }

    return(
        <>
            <div className="section">
                <h2>Courses</h2>
                <div>
                    {tasks.map((task, index) => 
                    <ul>
                        <input type='checkbox' key={index} onClick={() => removeTask(index)}/>
                        {task}
                    </ul>)}
                </div>
                <input type='text' id='taskInput' placeholder='Enter your task'/>
                <button onClickCapture={addTask} id='taskAdd'>Add Task</button>
            </div>
        </>
        
    );
}
export default Section