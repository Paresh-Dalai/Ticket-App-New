

import React from 'react';
import Typewriter from "typewriter-effect";
import './animation.css'
 
function Animation () {
    return (
        <div className="Animation">
            <Typewriter
 
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Welcome to Our")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Ticket-Creation App")
                        .start()
                        
                }}
            />
        </div>
    );
}
 
export default Animation;