import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Comentario from './Comentario';
import CajaComentario from './CajaComentario';


export default function ComentariosSection() {
    const {id} = useParams();
    const [comment, setComment] = useState([]);

  useEffect(getComentarios, []);
    

async function getComentarios() {
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
               fecha={comentario.fecha} id={comentario.id} update={getComentarios}
              />
              );
        });
      return comentarios
    }



return (
        <>
        <CajaComentario update={getComentarios} />
          <Container fluid>
              {comment &&
                getComments()
              }
          </Container>
        </>
    )
}
