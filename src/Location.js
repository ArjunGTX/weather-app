import React from "react";
import './styles.css';

export default function Location(props) {
    let {
        loc,
        date,
        time
    } = props;
    return (
        <div className='location-container'>
          <p className='location'>{loc}</p>
          <p className='date'>{`${date} ${time}`}</p>
        </div>
    )
}