import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import CDatosIDH from './CDatosIDH';
import ComentariosSection from './ComentariosSection';
import Noticias from './Noticias';

//BOOTSTRAP
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//MATERIAL IU
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

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
    useEffect(masInfo,[])

    const {id} = useParams();
    const [pais, setPais]= useState('');
    const [datos, setDatos] = useState('');
    const [data, setData]= useState('');

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
    async function masInfo(){
      const url = 'http://localhost:8000/paises/datos/'+ id;
      const response = await fetch(url)
      const data = await response.json(); 
      setData(data[0])
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
                    {pais.name}
                </Typography> 
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography component="legend">Rating</Typography>
                      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    </Box>


                  <Typography variant="h6" gutterBottom>
                      Capital:
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                              {pais.capital}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Region:
                    </Typography><Typography variant="h5" gutterBottom>
                              {pais.region}
                            </Typography>
                    <Typography variant="h6" gutterBottom>
                      Subregion:
                    </Typography><Typography variant="h5" gutterBottom>
                              {pais.subregion}
                            </Typography>
                    <Typography variant="h6" gutterBottom>
                      Area: 
                    </Typography><Typography variant="h5" gutterBottom>
                              {pais.area}
                            </Typography>
                    <Typography variant="h6" gutterBottom>
                      Gentilicio:
                    </Typography><Typography variant="h5" gutterBottom>
                              {pais.gentilicio}
                            </Typography>
                    <Typography variant="h6" gutterBottom>
                      Currency:
                    </Typography><Typography variant="h5" gutterBottom>
                              {pais.codemoneda},  {pais.simbmoneda} {pais.moneda}
                            </Typography>
                    <Typography variant="h6" gutterBottom>
                      Language/s:
                            </Typography><Typography variant="h5" gutterBottom>
                      
                    </Typography><Typography variant="h5" gutterBottom>
                              {pais.idioma1} , {pais.idioma2} , {pais.idioma3}
                            </Typography>
                    <Typography variant="h6" gutterBottom>
                      Calling Code:
                    </Typography><Typography variant="h5" gutterBottom>
                              {pais.callcode}
                            </Typography>

             </Paper> 
            </Col>

            <CDatosIDH data={datos} masdata={data}/>
            <Col>
            <Noticias name={pais.name}/>
            </Col>
          </Row>
                   
}    
    <ComentariosSection />
  </>
    )
}
