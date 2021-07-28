import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function Covid() {
    const {id}= useParams();

    useEffect(getData, [])
    async function getData(){
        const url = `https://covid19api.azurewebsites.net/v2/country/${id}`
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
