import React from 'react';
import classes from './Button.css';

const button = (props) => {
    return (
        <button className={[classes.Button, classes[props.btntype]].join(' ')} onClick={props.clicked}>{props.children}</button>
    )
}

export default button;