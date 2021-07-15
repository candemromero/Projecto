import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import ModalLogin from './ModalLogin'
//BOOSTRAP ELEMENTOS
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
//MATERIAL IU ELEMENTOS
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'LightSteelBlue',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavegationBar(props) {
  const classes = useStyles();

//ESTADOS
  const[showLoginModal, setShowLoginModal]= useState(false)
//FUNCIONES
  const handleLoginClick = () => {
    setShowLoginModal(true);
  }
  const handleCloseLogin = () => {
    setShowLoginModal(false);
  }
  const handleLogout = async () => {
    const url = 'http://localhost:8000/session';
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });
    if(response.status===200){
      props.updateUser(null)
    }else{
      alert(response.message);
    }

  }

  return (
    <>
      <Navbar bg='dark' expand="lg">
        <Link to="/" className="navbar-brand">INFOCOUNTRY</Link>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse alignright="true" id="basic-navbar-nav">
          <Nav  className="mr-auto">
          <Link to="/" className="nav-link">Home</Link>
            <Link to="/paises" className="nav-link">Countries</Link>
          </Nav>   
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {props.user ? (
          <NavDropdown alignright="true" title={props.user.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Favorites</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Comments</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} >Sign out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
            <Button variant="outlined" color="primary" onClick={handleLoginClick}>
            Sign in
            </Button>
            </>
          )
}
        </Navbar.Collapse>

      </Navbar>
      <ModalLogin show={showLoginModal} handleClose={handleCloseLogin} updateUser={props.updateUser} />
    </>
  )
}
