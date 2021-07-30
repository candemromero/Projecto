import React, {useState} from 'react';
import {Link} from 'react-router-dom';


//BOOTSTRAP COMPONENTS
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function ModalLogin(props) {
  //ESTADOS
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //FUNCIONES
  const handleEmail= (event) => {
    setEmail(event.target.value)
    //console.log(email);
  }
  const handlePassword= (event) => {
    setPassword(event.target.value);
    //console.log(password);
  }

  const handleAceptar= async () => {
      console.log(email, password);
  
      const url = 'http://localhost:8000/session';
  
      const params = {
        email,
        password,
      };
  
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      const data = await response.json();

      if(response.status === 200) {
        props.handleClose()
        props.updateUser({name: data.data})        
      }else{
        alert(data.message)
      }
    }

    return (
         <Modal
        show={props.show} onHide={props.handleClose}
      >
        <Modal.Header closeButton /> 

        <Modal.Body>
         
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleEmail}/>
                </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handlePassword}/>
            </Form.Group>

        </Form>

        </Modal.Body>

        <Modal.Footer>
        <Link to="/cuenta" className="nav-link" onClick={props.handleClose}>Sign up </Link>
          
          <Button variant="primary" onClick={handleAceptar}>
            Accept
          </Button>


        </Modal.Footer>

      </Modal>

    )}
