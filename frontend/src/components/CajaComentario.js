import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '85vw',
        margin: 30,
        alignItems: 'center',
    },
    boton:{
        alignItems: 'right',
        marginTop: 10,
    }
}))

export default function CajaComentario(props) {
    const classes = useStyles();
    const {id}= useParams();
    const [comentario, setComentario] = useState('');
    
    
    const handleCommentValue = (event) => {
        setComentario(event.target.value)
    }
    async function handleSubmit(){
        const url = `http://localhost:8000/comentarios`;
        const formData = new FormData();

        formData.append('descripcion', comentario);
        formData.append('id', id);
        
        const response = await fetch(url, {
                        method: 'POST',
                        body: formData,
                        credentials: 'include',
                        })
        const data = await response.json();
        if(data.status ===200){
            swal("TODO BIEN");
            props.update();
            setComentario('');
        }else{ 
            swal("ERROR");
        }        
    };

    
    return (
        <Container className={classes.root}>
            <textarea
            className="form-control "
            id="exampleFormControlTextarea1"
            rows="5"
            onChange={handleCommentValue}
            value={comentario}
            />
            <Button className={classes.boton} variant="primary" size="sm" onClick={handleSubmit}>
            Submit
            </Button>
        </Container>
        )
}
