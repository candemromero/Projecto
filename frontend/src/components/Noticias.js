import React, {useState, useEffect} from 'react';

//MATERIAL IU
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Row } from 'react-bootstrap';

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      marginTop: 10,
      marginBottom: 5,
    },
    media: {
      height: 140,
    },
  });


export default function Noticias(props) {
    const classes = useStyles();
    const [noticias, setNoticias] = useState([]);
    useEffect(news, [])
    async function news(){
        const url = `https://free-news.p.rapidapi.com/v1/search?q=${props.name}&lang=es&page=1&page_size=4&topic=politics`
        const response = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d8139aa84bmsh411ff0643a33672p1233ffjsn5426b3d62db6",
                "x-rapidapi-host": "free-news.p.rapidapi.com"
            }
})
        const data = await response.json();
        setNoticias(data.articles);
    }

    function getNews() {
        const cards = noticias.map((noticia)=>{
          return (
            <Card className={classes.root}>
                <CardMedia
                className={classes.media}
                image={noticia.media}
                title={noticia.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h4">
                    {noticia.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {noticia.summary}
                </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" color="primary" href={noticia.link}>
                Learn More
                </Button>
            </CardActions>
            </Card>
          )})
          return cards;
        
    }
    return (
        <>
        <Row>
        <Typography gutterBottom variant="h4" component="h3">
            Noticias
        </Typography>
        </Row>
        <Row className={classes.root}>
        {getNews()}
        </Row>
        </>
    )
}
