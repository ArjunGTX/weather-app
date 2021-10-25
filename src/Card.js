import React from "react";
import './styles.css';

export default function Card(props) {
    let {
        data1,
        data2,
        data3,
        img
    } =props;
    if(img) {
        return (
            <div className='card'>
                <p className='text text-special'><span>{data1}</span></p>
                <p className='text text-special'>{data2}</p>
                <img src={img} alt='icon' className='weather-icon' />
            </div>
        )
    } else {
        return (
            <div className='card'>
                <p className='text'>{data1}</p>
                <p className='text'>{data2}</p>
                <p className='text'>{data3}</p>
            </div>
        )
    }
}