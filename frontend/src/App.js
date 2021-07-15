import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"

//COMPONENTS
import MyNavbar from "./components/NavigationBar";
import Header from "./components/Header";
import CountryList from "./components/CountryList";
import CardDetail from "./components/CardDetail";
import ComentariosSection from "./components/ComentariosSection"
import CajaComentario from "./components/CajaComentario";


function App() {

  useEffect(checkUser, []);

  async function checkUser() {
  const url = 'http://localhost:8000/session/check';

    const response = await fetch(url,{
      credentials: 'include',
    })
    const data = await response.json()
    updateUser(data.data) 
  }

   //ESTADOS
  const [user, setUser] = useState(null);

  //FUNCIONES
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
  <BrowserRouter>   
    <MyNavbar user={user} updateUser={updateUser}/>
    <Switch>
      <Route exact path="/">
        <Header />
        <CountryList />
      </Route>
      <Route exact path="/detalle/:id">
         <CardDetail />
         <CajaComentario />
         <ComentariosSection />
      </Route>

      <Route exact path="/paises" >
      <CountryList />
      </Route>
    </Switch>
  </BrowserRouter>
  )
  
}

export default App;
