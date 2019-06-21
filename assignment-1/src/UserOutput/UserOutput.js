import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    return(
        <div className="UserOutput">
            <p>UserName: {props.userName}, Age: {props.age}</p>
            <p>This is my User details</p>
        </div>
    )
}

export default userOutput;