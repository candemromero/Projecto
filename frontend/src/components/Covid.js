import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function Covid() {
    const {id}= useParams();

    useEffect(getData, [])
    async function getData(){
        const url = ``
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
    }
    return (
        <div>
            hola
        </div>
    )
}
