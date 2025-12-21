import React, { useState } from 'react'
import './section.css'

function Section({ onDelete }) {

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [section, setSection] = useState("");
    const [draftSection, setDraftSection] = useState("");

    function addTask(event) {
        setTask(event.target.value);
    }

    function addTaskButton() {
        setTasks([...tasks, task]);
        setTask("");
    }

    function removeTask(index) {
        setTasks(tasks.filter((__, i) => i != index));
    }

    function renameSection(event) {
        setDraftSection(event.target.value);
    }

    function renameSectionButton() {
        setSection(draftSection);
        setDraftSection("");
    }

    return (
        <>
            <div className="section">
                <h2>{section}</h2>
                <input type='text' placeholder='Enter your section name' value={draftSection} onChange={renameSection} />
                <button className="add-button" onClick={renameSectionButton}>Rename Section</button>
                <div className='tasks-container'>
                    {tasks.map((task, index) =>
                        <div className='tasks-list'>
                            <button className="check-button" key={index} onClick={() => removeTask(index)}>✅</button>
                            {task}
                        </div>
                    )}
                </div>
                <input type='text' onChange={addTask} value={task} placeholder='Enter your task' />
                <button className="add-task" onClick={addTaskButton}>Add Task</button>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button className="delete-section-button" onClick={onDelete}>Delete Section</button>
                </div>
            </div>
        </>
    );
}
export default Section