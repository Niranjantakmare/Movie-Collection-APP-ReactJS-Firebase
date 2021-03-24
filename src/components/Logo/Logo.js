import React from 'react';
import MediaBox from '../../assets/MediaBox-HD-Icon.png';
import classes  from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={MediaBox} alt="Movie App"></img>
        </div>
    )
}

export default logo;
