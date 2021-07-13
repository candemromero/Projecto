import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Image from 'react-bootstrap/Image'
//MATERIAL IU
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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

    const {id} = useParams();
    const [pais, setPais]= useState(null);
    useEffect(cargarInfo);

    async function cargarInfo(){
        const url = 'http://localhost:8000/paises/'+ id
        const response = await fetch(url);
        const data = await response.json();
        setPais(data)
        if(data===null){
            console.log('error en buscar la info')
        }else{
            console.log('otro error')
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                {pais &&
                <>
            <Grid item xs>
            <Paper className={classes.paper}>
               <Image classNmae={classes.media} width={250} src={pais.bandera} rounded />
               <Typography gutterBottom variant="h3">
                  {pais.nombre}
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper}>xs</Paper>
            </Grid>
            </>
            }
        </Grid>
      </div>
    )
}
