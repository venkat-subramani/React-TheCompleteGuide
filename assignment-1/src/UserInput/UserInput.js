import React from 'react';

const userInput = (props) => {
    const style = {
        backgroundColor: '#eee',
        border: '1px solid red',
        padding: '10px'
    }
    return(
        <div>
            <input 
                type="text"
                style={style}
                onChange={props.change}
                value={props.currentName} />
        </div>
    )
}

export default userInput;