import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/authentication';
 
import './index.css';

import App from './pages/home/App.js';
import NotFound from './pages/notFound/notFound';
import listarAdm from './pages/listarADM/listarADM'
import listarMedico from './pages/listarMedico/listarMedico'
import listarPaciente from './pages/listarPaciente/listarPaciente'
import Cadastrar from './pages/cadastro/cadastro'
import Login from './pages/login/login';
import Descricao from './pages/descricao/descricao'

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component : Component  }) => (
  <Route 
    render = { props =>
      // Verifica se o usuário está logado e se é Administrador
      usuarioAutenticado() && parseJwt().Tipo === "1" ? 
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> : 
      // Se não, redireciona para a página de login
      <Redirect to = '/login' />
    }
  />
);

const PermissaoMedico = ({ component : Component  }) => (
  <Route 
    render = { props =>
      // Verifica se o usuário está logado e se é Medico
      usuarioAutenticado() && parseJwt().Tipo === "2" ? 
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> : 
      // Se não, redireciona para a página de login
      <Redirect to = '/login' />
    }
  />
);

const PermissaoPaciente = ({ component : Component  }) => (
  <Route 
    render = { props =>
      // Verifica se o usuário está logado e se é Paciente
      usuarioAutenticado() && parseJwt().Tipo === "3" ? 
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> : 
      // Se não, redireciona para a página de login
      <Redirect to = '/login' />
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <PermissaoAdm path="/listarAdm" component={listarAdm} />
        <PermissaoMedico path="/listarMedico" component={listarMedico} />
        <PermissaoPaciente path="/listarPaciente" component={listarPaciente} />
        <PermissaoAdm  path="/cadastro" component={Cadastrar} />
        <Route path="/login" component={Login} />
        <PermissaoAdm path="/descricao" component={Descricao} />
        <Redirect to="/notFound" component={NotFound} />
        <Route path="/notFound" component={NotFound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
