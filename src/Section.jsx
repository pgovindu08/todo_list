import React, {useState} from 'react'
import './section.css'

function Section(){
    
    const [task, setTask] = useState("");

    function handleTaskChange(event){
        setTask(event.target.value);
    }

    const resetTask = () => {
        setTask("");
    }

    return(
        <div className="section">
            <h2>Courses</h2>
            <div className='task-heading'>
                <input type='checkbox'></input> 
                <p>{task}</p>
            </div>
            <div>
                <input value={task} onChange={handleTaskChange}></input>
                <button onClick={resetTask}>New Task</button>
            </div>
        </div>
    );
}
export default Section