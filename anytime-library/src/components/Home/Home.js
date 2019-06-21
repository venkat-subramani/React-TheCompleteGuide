import React from 'react';

import classes from './Home.css';

const Home = () => {
    return (
        <div className={classes.Home}>
            <h1>A Room without a book</h1>
            <h1>is like</h1>
            <h1>a body without soul</h1>
            <h3> ~ CICERO</h3>
            {/* <h1>Welcome<br/>to<br/>AnyTime Library</h1> */}
        </div>
    )
};

export default Home;