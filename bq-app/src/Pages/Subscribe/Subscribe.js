import React, { useState } from 'react';
import './Subscribe.css';
import HeaderPhoto from '../../Components/HeaderPhoto';
import burger from '../../img/burger-logo.png'; 
import { useHistory } from 'react-router-dom';

  function Subscribe() {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassord] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
   
    const history = useHistory();
    function goLogin() {
      history.push('/')
    }
   
  const subscribe = (newEmail, newPassword, role, name) => {
   
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
   
   let urlencoded = new URLSearchParams();
   urlencoded.append("email", `${newEmail}`);
   urlencoded.append("password", `${newPassword}`);
   urlencoded.append("role", `${role}`);
   urlencoded.append("restaurant", "Tartaria Burger");
   urlencoded.append("name", `${name}`);
   
   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: urlencoded,
     redirect: 'follow'
   };
   
   fetch("https://lab-api-bq.herokuapp.com/users", requestOptions)
     .then(response => response.text())
     .then(result => {console.log(result)
       goLogin()
     })
     .catch(error => console.log('error', error));
    }
   
    const handleNewSubmit = (event) => {
     event.preventDefault();
     subscribe(newEmail, newPassword, role, name)
   }
   
   return (
    <div className="subscribe-area">
      <HeaderPhoto Logo2={burger} />
        <div className="register-box">
          <form>
            <label>email</label>
            <input type="text" value={newEmail} onChange={(event) => setNewEmail(event.target.value)}/>
            <label>password</label>
            <input type="password" autoComplete="off" value={newPassword} onChange={(event) => setNewPassord(event.target.value)}/>
            <label>Área</label>
            <input type="text" placeholder="Cozinha ou Salão" value={role} onChange={(event) => setRole(event.target.value)}/>
            <label>Nome</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>          
            <button type="submit" onClick={(event) => handleNewSubmit(event)}>Enviar</button>
          </form>
        </div>
    </div>
)}

export default Subscribe;
