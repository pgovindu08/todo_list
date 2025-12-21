import React, { useState, useEffect } from 'react';
import Section from './Section';
import './index.css';

function Button() {

    const [sections, setSections] = useState([]); // array of sections

    // Fix for stale state: Ensure all sections have an ID
    useEffect(() => {
        setSections(prev => prev.map(s => s.id ? s : { ...s, id: Math.random().toString(36) + Date.now().toString(36) }));
    }, []);

    function handleClick() {
        setSections([...sections, { id: Math.random().toString(36) + Date.now().toString(36) }]); // push a new section with unique ID
    }

    function deleteSection(id) {
        setSections(sections.filter(section => section.id !== id));
    }

    return (
        <>
            <div className='menu-bar'>
                <button onClick={handleClick} className="menu-button">Add Section</button>
            </div>
            <div className='sections-display'>
                {sections.map((section) => (
                    <Section key={section.id} onDelete={() => deleteSection(section.id)} />
                ))}
            </div>
        </>
    );
}

export default Button