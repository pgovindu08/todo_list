import React, { useState, useEffect } from 'react';
import Section from './Section';
import './index.css';

const STORAGE_KEY = 'todo-board-v1';

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36) + Date.now().toString(36);
}

function Button() {
  const [sections, setSections] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
    } catch {
      // ignore write errors (e.g. private mode)
    }
  }, [sections]);

  function handleClick() {
    const newSection = {
      id: createId(),
      title: '', // start with empty title so the rename box is blank
      tasks: [],
    };
    setSections(prev => [...prev, newSection]);
  }

  function deleteSection(id) {
    setSections(prev => prev.filter(section => section.id !== id));
  }

  function addTask(sectionId, text, dueDate) {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? {
              ...section,
              tasks: [
                ...(section.tasks || []),
                { id: createId(), text, dueDate },
              ],
            }
          : section
      )
    );
  }

  function removeTask(sectionId, taskIndex) {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? {
              ...section,
              tasks: (section.tasks || []).filter((_, i) => i !== taskIndex),
            }
          : section
      )
    );
  }

  function moveTask(sectionId, fromIndex, toIndex) {
    setSections(prev =>
      prev.map(section => {
        if (section.id !== sectionId) return section;
        const tasks = [...(section.tasks || [])];
        if (toIndex < 0 || toIndex >= tasks.length) return section;
        const [moved] = tasks.splice(fromIndex, 1);
        tasks.splice(toIndex, 0, moved);
        return { ...section, tasks };
      })
    );
  }

  function moveTaskUp(sectionId, index) {
    moveTask(sectionId, index, index - 1);
  }

  function moveTaskDown(sectionId, index) {
    moveTask(sectionId, index, index + 1);
  }

  function renameSection(sectionId, newTitle) {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, title: newTitle } : section
      )
    );
  }

  return (
    <>
      <div className="menu-bar">
        <button onClick={handleClick} className="menu-button">
          Add Section
        </button>
      </div>
      <div className="sections-display">
        {sections.map(section => (
          <Section
            key={section.id}
            section={section}
            onDelete={() => deleteSection(section.id)}
            onAddTask={addTask}
            onRemoveTask={removeTask}
            onMoveTaskUp={moveTaskUp}
            onMoveTaskDown={moveTaskDown}
            onRenameSection={renameSection}
          />
        ))}
      </div>
    </>
  );
}

export default Button
