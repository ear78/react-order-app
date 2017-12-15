import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Hamburger} onClick={props.clicked}>Menu</div>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
    
}

export default toolbar;