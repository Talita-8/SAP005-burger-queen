import React, { useState } from 'react';
import Header from './Components/Header';
// import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// import { useAlert } from 'react-alert';
import './App.css';
import { useHistory, Link } from 'react-router-dom';
import burguer from './img/burguer.jpg';

function Login() {

  const history = useHistory();

  function goSaloon() {
    history.push('/saloon')
  }

  function goKitchen() {
    history.push('/kitchen')
  }

  const [email, setEmail] = useState('');
  const [password, setPassord] = useState('');
   
  const login = (email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
   
    let urlencoded = new URLSearchParams();
    urlencoded.append("email",  `${email}`);
    urlencoded.append("password", `${password}`);
   
    let requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: urlencoded,
       redirect: 'follow'
  };
   
   fetch("https://lab-api-bq.herokuapp.com/auth", requestOptions)
     .then(response => response.json())
     .then(result => { console.log(result)
        if(result.role === "garçom") {
          goSaloon();
        }
        else if(result.role === "cozinha"){
          goKitchen();
        }
      })
     .catch(error => { console.log('error', error)
      });
   }
   
   
    const handleSubmit = (event) => {
      event.preventDefault();
      login(email, password)
    }

   return (
    <div className="login-area"> 
      <Header />
      <img className="img-burguer" src={burguer}/>
      <div className="input-box">
          <form>
            <label>email</label>
             <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/> 
             <label>password</label> 
             <input type="password" autoComplete="off" value={password} onChange={(event) => setPassord(event.target.value)}/> 
             <button type="submit" onClick={(event) => handleSubmit(event)}>Entrar</button>  
          </form>
          <div className="link-register"><Link to="/subscribe">Entrando agora para o time? Cadastre-se!</Link></div>
       </div>
    </div>
)}

export default Login;