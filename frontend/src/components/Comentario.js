import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

export default function Comentario(props) {
    const classes = useStyles();
    const [usuario, setUsuario] = useState (null)

    const handleRemove = async() => {
        const url = `http://localhost:8000/comentarios/${props.id}`;
        const response = await fetch(url, { method: 'DELETE', credentials: 'include' });
        const data = await response.json();
    }
 useEffect (datosUser, [])
    async function datosUser(){
      const url = `http://localhost:8000/usuarios/${props.usuario}`;
        const response = await fetch(url, { credentials: 'include' });
        const data = await response.json();
        setUsuario(data)
    }

    return (
        <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                    <Grid item>
                        <img className={classes.img} alt="complex" src={props.imagen} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                            {usuario.nombre} 
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom color="textSecondary">
                            {props.fecha}
                            </Typography>
                            <Typography variant="body2" >
                            {props.desc}
                            </Typography>
                        </Grid>
                        <Grid item>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleRemove}
                            >
                        Borrar
                        </Link>
                        </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Paper>
    )
}
