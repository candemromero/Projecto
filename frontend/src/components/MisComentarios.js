import React,{useState, useEffect} from 'react';
import Comentario from './Comentario';
import Container from 'react-bootstrap/Container';


export default function MisComentarios() {
    useEffect(getComentarios,[]);
    const [comentarios, setComentarios]= useState('')
    async function getComentarios(){
        const url = `http://localhost:8000/comentarios/usercom`
        const response = await fetch(url,{credentials: 'include'});
        const data = await response.json();
        setComentarios(data);
    }
    function getComments() {
        const datos = comentarios.map((comentario) => {
            return(
              <Comentario usuario={comentario.iduser} desc={comentario.descripcion}
               fecha={comentario.fecha} id={comentario.id} update={getComentarios}
              />
              );
        });
      return datos
    }
    return (
            <Container fluid>
                <h1>My Comments</h1>
              {comentarios &&
                getComments()
              }
          </Container>
    )
}
