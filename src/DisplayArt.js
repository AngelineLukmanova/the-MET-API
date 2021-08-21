import React from 'react';
import './DisplayArt.css';

function DisplayArt(props) {
    const { artistDisplayName, medium, objectDate, title, primaryImage, department } = props.data;
    return (
        <div className="DisplayArt">
            <img src={primaryImage} alt={`${title}`}></img>
            <div className="DisplayArt-info">
                {artistDisplayName && <p><span>Artist: </span>{artistDisplayName}</p>}
                {title && <p><span>Title: </span>{title}</p>}
                {objectDate && <p><span>Date: </span>{objectDate} </p>}
                {medium && <p><span>Medium: </span>{medium}</p>}
                {department && <p><span>Department: </span>{department}</p>}
            </div>
        </div>
    );
}

export default DisplayArt;

