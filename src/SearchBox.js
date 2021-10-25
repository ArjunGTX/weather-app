import React from "react";
import './styles.css';

export default function SearchBox(props) {
    let {
        onAction,
        clickHandler,
        enterKeyHandler,
        location
    } = props;
    return(
        <div className='search-container'>
          <input className='loc-input' type= 'text' onChange={onAction} onKeyPress={enterKeyHandler} value={location} autoFocus/>
          <button className='search-btn' onClick={clickHandler}>
          <img className='search' src='assets/icons/icons8-search.svg' alt='search-icon'/>
          </button>
        </div>
    )
}