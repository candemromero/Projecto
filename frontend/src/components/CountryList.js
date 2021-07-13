import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import CCard from './Card';


export default function CountryList() {

 const [paises, setPaises] = useState([]);

  useEffect(getPubs, []);
async function getPubs() {
  let url = 'http://localhost:8000/paises';

  const response = await fetch(url, { credentials: 'include' });
  const data = await response.json();

  setPaises(data);
}

function getCards() {
  const cards = paises.map((pais) => {
    return (
      <CCard
        nombre={pais.nombre}
        imagen={pais.bandera}
        id={pais.id}  
      />
    );
  });

  return cards;
}
  return (
    <>
   <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 justify-content-center mx-4">
        {getCards()}
      </Row>
    </>
  )
  }