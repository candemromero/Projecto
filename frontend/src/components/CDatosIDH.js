import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Col from 'react-bootstrap/Col';
import Typography from '@material-ui/core/Typography';



export default function CDatosIDH(props) {
    const info = props.data;    
    const valor = props.masdata;

    function getDatos() {
        const datos = props.data.map((pais) => {
          return (
            <Paper>
                <Typography variant="button" display="block" gutterBottom>
                    {pais.indcode}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    {pais.value}
                </Typography>
            </Paper>
          );
        })

    return datos} 


    return (
        <Col>
        <Paper>
        <Typography variant="button" display="block" gutterBottom>
            HDI Rank
        </Typography>
        <Typography variant="h4" gutterBottom>
            {valor.idhRank}
        </Typography>
        </Paper>
        <Paper>
        <Typography variant="button" display="block" gutterBottom>
        Life expectancy at birth
        </Typography> 
        </Paper>
        <Paper>
        <Typography variant="h4" gutterBottom>
            {valor.life}
        </Typography></Paper>
        <Paper>
        <Typography variant="button" display="block" gutterBottom>
        Women with account at financial institution or with mobile money-service provider (% of female population ages 15 and older)
        </Typography>
        <Typography variant="h4" gutterBottom>
            {valor.wbank}
        </Typography></Paper>
        <Paper>
        <Typography variant="button" display="block" gutterBottom>
        Mandatory paid maternity leave (days)
        </Typography>
        <Typography variant="h4" gutterBottom>
            {valor.matday}
        </Typography>
        </Paper>
        <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
        Data from database: World Development Indicators
        </Typography>

        {info &&
        getDatos()
        }
        </Col>
    )
    }
