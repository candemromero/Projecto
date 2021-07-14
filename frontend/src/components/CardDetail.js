import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ComentariosSection from './ComentariosSection';
import CDatosIDH from './CDatosIDH';
import CInfoGeneral from './CInfoGeneral';
//BOOTSTRAP
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//MATERIAL IU
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    margin: 0,
    padding: 0,
  }
}));

export default function CardDetail() {
    const classes = useStyles();
    useEffect(cargarInfo, []);
    useEffect(getData,[])

    const {id} = useParams();
    const [pais, setPais]= useState('');
    const [datos, setDatos] = useState('');

    async function cargarInfo(){
        const url = 'http://localhost:8000/paises/'+ id;
        const response = await fetch(url);
        const data = await response.json();
        if(data){
          setPais(data[0]);
        } else{ 
          console.log('Error en traer la data IDH')
        }
        
    }

    //INFO CDatosIDH
    async function getData() {
      const url = `http://localhost:8000/paises/data/${id}`
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if(data){
        setDatos(data)
      } else{ 
        console.log('Error en traer la data IDH')
      }
      
   }

    return (
      <>
      {pais &&
          <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3">
            <Col>
          <Paper className={classes.paper}>
                <Image className={classes.media} width={250} src={pais.bandera} rounded />
                <Typography gutterBottom variant="h3">
                    {pais.nombre}
                  </Typography>

             </Paper> 
            </Col>
          
            <CDatosIDH data={datos} />
          
          </Row>
}
        <ComentariosSection />
      </>
    )
}
