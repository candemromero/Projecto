import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Comentario from './Comentario';



export default function ComentariosSection() {
    const {id} = useParams();
    const [comment, setComment] = useState([])
    useEffect(getInfo, []);
    

async function getInfo() {
  const url = 'http://localhost:8000/comentarios/' + id;

    const response = await fetch(url, { credentials: 'include' });
    const data = await response.json();
    if(data===null){
      console.log('error en buscar la info')
  }else{
    setComment(data) 
}
}

    function getComments() {
        const comentarios = comment.map((comentario) => {
            return(
              <Comentario usuario={comentario.iduser} desc={comentario.descripcion}
              imagen={comentario.imagen} fecha={comentario.fecha} id={comentario.id}
              />
              );
        });
      return comentarios
    }





return (
        <>
          <Container fluid>
              {comment &&
                getComments()
              }
          </Container>
        </>
    )
}
