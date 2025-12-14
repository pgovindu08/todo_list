import {Routes, Route} from 'react-router-dom'
import Section from './Section';

function Button(){
    return(
        <>
            <div className="wrapper">
                <button className="button">Home</button>
                <button className="button">New Section</button>
                <button className="button">About</button>
            </div>
        </>
    );
}

export default Button