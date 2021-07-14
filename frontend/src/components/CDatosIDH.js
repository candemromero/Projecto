import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Col from 'react-bootstrap/Col';
import Typography from '@material-ui/core/Typography';



export default function CDatosIDH(props) {
    const info = props.data;
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
        {info &&
        getDatos()
        }
        <Typography variant="caption" display="block" color="textSecondary" gutterBottom>
        Data from database: World Development Indicators
        </Typography>
        </Col>
    )
    }
