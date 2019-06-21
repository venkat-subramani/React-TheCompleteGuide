import React from 'react';

const Validation = (props) => {
    return (
        <div>
            { props.text.length <= 5 ? <p>Text too short</p> : null}
            { props.text.length > 5 ? <p>Text long Enough</p> : null}
        </div>
    )
}

export default Validation;