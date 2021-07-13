import React from 'react';
import {Link} from 'react-router-dom';

//MATERIAL IU
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '40vh',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    background: 'linear-gradient(45deg, #C2D3CD 30%, #CDE5D7 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #B4E1FF',
  },
  media: {
    height: '23vh',
    alignItems: 'top',
    marginBottom: 10,
  },
  content:{
    height: '18vh',
    padding: 5,
    textAlign: 'center',
},
  action: {
    height: '40vh',
}
});

export default function CCard(props) {
  const classes = useStyles();

  return (

    <Link to={`/detalle/${props.id}`}>
      <Card className={classes.root} variant="outlined" >
        <CardActionArea className={classes.action}>
          <CardMedia
            className={classes.media}
            image={props.imagen}
          />
          <CardContent className={classes.content}>
            <Typography  gutterBottom variant="h5" component="h1">
              {props.nombre}
            </Typography>
          </CardContent>
        </CardActionArea> 
      </Card>
      </Link>
)}
