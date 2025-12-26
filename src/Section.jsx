import React, { useState, useEffect } from 'react';
import './section.css';

function Section({
  section,
  onDelete,
  onAddTask,
  onRemoveTask,
  onMoveTaskUp,
  onMoveTaskDown,
  onRenameSection,
}) {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [draftSection, setDraftSection] = useState(section.title || '');

  useEffect(() => {
    setDraftSection(section.title || '');
  }, [section.title]);

  function handleTaskChange(event) {
    setTask(event.target.value);
  }

  function handleDateChange(event) {
    setTaskDate(event.target.value);
  }

  function addTaskButton() {
    const trimmed = task.trim();
    if (!trimmed) return;

    onAddTask(section.id, trimmed, taskDate || null);
    setTask('');
    setTaskDate('');
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addTaskButton();
    }
  }

  function handleRenameChange(event) {
    setDraftSection(event.target.value);
  }

  function handleRenameClick() {
    const title = draftSection.trim() || 'Untitled Section';
    onRenameSection(section.id, title);
  }

  return (
    <>
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">{section.title || 'New Section'}</h2>
          <div className="section-rename">
            <input
              type="text"
              placeholder="Section name"
              value={draftSection}
              onChange={handleRenameChange}
            />
            <button className="add-section-button" onClick={handleRenameClick}>
              Rename
            </button>
          </div>
        </div>

        <div className="tasks-container">
          {section.tasks &&
            section.tasks.map((taskItem, index) => {
              const formattedDate = taskItem.dueDate
                ? new Date(taskItem.dueDate).toLocaleDateString()
                : null;

              return (
                <div className="tasks-list" key={taskItem.id || index}>
                  <div className="task-main">
                    <span className="task-text">{taskItem.text}</span>
                    {formattedDate && (
                      <span className="task-date">Due: {formattedDate}</span>
                    )}
                  </div>
                  <div className="task-actions">
                    <button
                      className="icon-button"
                      onClick={() => onMoveTaskUp(section.id, index)}
                      aria-label="Move task up"
                    >
                      ↑
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => onMoveTaskDown(section.id, index)}
                      aria-label="Move task down"
                    >
                      ↓
                    </button>
                    <button
                      className="icon-button delete-task"
                      onClick={() => onRemoveTask(section.id, index)}
                      aria-label="Delete task"
                    >
                      🗑
                    </button>
                    <button
                      className="icon-button delete-task"
                      onClick={() => onRemoveTask(section.id, index)}
                      aria-label="Delete task"
                    >
                      ✅
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="new-task-row">
          <input
            type="text"
            onChange={handleTaskChange}
            value={task}
            placeholder="Enter your task"
            onKeyDown={handleKeyPress}
          />
          <input
            type="date"
            value={taskDate}
            onChange={handleDateChange}
            className="date-input"
          />
          <button className="add-task" onClick={addTaskButton}>
            Add Task
          </button>
        </div>

        <div className="section-footer">
          <button className="delete-section-button" onClick={onDelete}>
            Delete Section
          </button>
        </div>
      </div>
    </>
  );
}

export default Section
