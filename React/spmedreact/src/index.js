import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom'
import { parseJwt, usuarioAutenticado } from './services/auth'

import './index.css';

import Login from './pages/login/login';
import Adm from './pages/adm/adm';
import Pac from './pages/pac/pac';
import Med from './pages/med/med';
import NotFound from './pages/notfound/notfound';

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoPac = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
      <Component {...props}/>
    ) : (
      <Redirect to = "login"/>
    )
    }
  />
)

const PermissaoMed = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
      <Component {...props}/>
    ) : (
      <Redirect to = "login"/>
    )
    }
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component = {Login}/>
        <Route path ="/login" component ={Login}/>
        <PermissaoAdm path = "/adm" component = {Adm}/>
        <PermissaoMed path = "/med" component = {Med}/>
        <PermissaoPac path = "/pac" component = {Pac}/>
        <Route path = "/notFound" component = {NotFound}/>
        <Redirect to = "/notFound"/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
