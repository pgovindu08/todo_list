import React, {useState, useEffect} from 'react';
import Section from './Section';

function Button(){
    
    const [sections, setSections] = useState([]); // array of sections
    
    function handleClick() {
        setSections([...sections, {}]); // push a new section
    }

    return(
        <>
            <nav className='button holder'>
                <button className="button">Home</button>
                <button onClick={handleClick} className="button">Add Section</button>
                {sections.map((_, index) => (
                    <Section key={index} />  // render a Section for each array element
                ))}
                <button className="button">About</button>
            </nav>
        </>
    );
}

export default Button