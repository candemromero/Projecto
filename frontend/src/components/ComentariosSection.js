import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Comentario from './Comentario';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));


export default function ComentariosSection() {
    const classes = useStyles();
    const [comment, setComment] = useState(null)

    useEffect(getInfo, []);
async function getInfo() {
  let url = 'http://localhost:8000/comentarios';

  const response = await fetch(url, { credentials: 'include' });
  const data = await response.json();

  setComment(data);
}

function getComments() {
  if(comment){
  const comentarios = comment.map((comentario) => {
    return (
      <Comentario usuario={comment.iduser}
      pais={comment.idcountry} desc={comment.descripcion}
      imagen={comment.imagen} fecha={comment.fecha} id={comment.id}
      />
      )})}else{
        console.log('no llegaron los datos del comentario')
      }
  }
  


return (
        <>
            <Box className={classes.root} color="text.primary">
                {getComments()}
            </Box>
        </>
    )
}
