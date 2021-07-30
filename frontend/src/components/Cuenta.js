import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';


export default function MisComentarios() {
    useEffect(getUsuario,[]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');    
    const [usuario, setUsuario]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function getUsuario(){
        setUsuario(200);
        const url = `http://localhost:8000/usuarios/user`
        const response = await fetch (url, {credentials: 'include'})
        const data = await response.json();
        if(data){
        setUsuario(data[0]);
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setEmail(usuario.mail);
        setPassword(usuario.password);
        }
    }
    async function handleEdit(){
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('email', email);
        formData.append('password', password);
        if(usuario===200) {
            const url= `http://localhost:8000/usuarios/`
            const response = await fetch(url,{method: 'POST',  body: formData, credentials: 'include'});
            const data = await response.json();
            swal(data.message, 'Log in')
        }else{
        const url= `http://localhost:8000/usuarios/${usuario.id}`
        const response = await fetch(url,{method: 'PUT',  body: formData,credentials: 'include'});
        const data = await response.json();
        swal(data.message)
        getUsuario();
        }

        
    }
    const handleName= (event)=> {
        setNombre(event.target.value);
    }
    const handleSurname = (event)=>{
        setApellido(event.target.value);
    } 
    const handleEmail = (event)=>{
        setEmail(event.target.value);
    } 
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    } 
    return (
        <Container fixed>
            {usuario&&
            <Form>
                <Row>
            <Form.Label column lg={2}>
            Name
            </Form.Label>
            <Col>
            <Form.Control type="text"  value ={nombre} onChange={handleName}/>
            </Col>
        </Row>
            <Row>
            <Form.Label column lg={2}>
            Surname
            </Form.Label>
            <Col>
            <Form.Control type="text" value ={apellido} onChange={handleSurname}/>
            </Col>
            </Row>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Email
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="email" value={email} onChange={handleEmail}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                Password
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="password" value={password} onChange={handlePassword} />
                </Col>
            </Form.Group>
            </Form>
            }
            <Button variant="info" onClick={handleEdit}>Save</Button>

    </Container>
    )
}