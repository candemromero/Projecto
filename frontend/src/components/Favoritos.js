import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Favoritos() {
    useEffect(cargarFav, []);
    const [favorito, setFavorito]= useState('');
    async function cargarFav() {
        const url= 'http://localhost:8000/favoritos/';
        const response = await fetch(url, {credentials: 'include'})
        const data = await response.json();
        setFavorito(data)
    }
    function getFav(){
         const datos = favorito.map(async function(fav){
            const url= `http://localhost:8000/paises/${fav.idcountry}`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            /* return(
                <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={data[0].bandera} />
                    <Card.Body>
                        <Button variant="link">{data[0].name}</Button>
                    </Card.Body>
                    </Card>
                </Col>
            )  */
        })
        return datos;
    }
    return (
       
        <> {favorito &&
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 justify-content-center mx-4">
        {getFav()}
      </Row>}
        </> 
    )
}
