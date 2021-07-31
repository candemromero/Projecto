import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from '@material-ui/core/Container';
import Swal from 'sweetalert2';


export default function CuentaEditor(props) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleName = (event) => {
    setNombre(event.target.value);
  };

  const handleSurname = (event) => {
    setApellido(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePubSaved = (message) => {
    Swal.fire({
      text: message,
      icon: 'success',
    });
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('password', password);
    formData.append('email', email);

    let url, method;

    if (props.user) {
      //Modo edicion
      url = `http://localhost:8000/usuarios/${props.user.id}`;
      method = 'PUT';
    } else {
      //Modo nuevo
      url = `http://localhost:8000/usuarios`;
      method = 'POST';
    }

    fetch(url, {
      method: method,
      body: formData,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        handlePubSaved(data.message);
        setNombre('');
        setApellido('');
        setPassword('');
        setEmail('');
      });
  };

  useEffect(async() => {
    if (props.user) {
      const url = `http://localhost:8000/usuarios/user`;

      const response = await fetch(url,{credentials: 'include'})
      const data = await response.json();
      if(data){
          setNombre(data[0].nombre);
          setApellido(data[0].apellido);
          setPassword(data[0].password);
          setEmail(data[0].mail);
            } else {
      setNombre('');
      setApellido('');
      setPassword('');
      setEmail('');
      console.log('ACA')
    }}
  }, [props.user]);

  return (
    <Container fixed>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={handleName}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              value={apellido}
              onChange={handleSurname}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmail}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePassword}
            ></Form.Control>
          </Form.Group>
          </Form>
        <Button onClick={handleSave}>Save</Button>
        </Container>
  );
}