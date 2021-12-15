import React from "react";

import { Redirect, useHistory } from "react-router-dom";

import { parseJwt, usuarioAutenticado } from '../../services/auth'

import '../../assets/css/header.css'
import Logo from '../../assets/img/SpMedGroup_Logo 1.png'
import Home from '../../assets/img/Home.png'
import Info from '../../assets/img/Info.png'
import Contato from '../../assets/img/Contato.png'
import Consulta from '../../assets/img/Consulta.png'
import Login from '../../assets/img/Login.png'
import Logout from '../../assets/img/Logout.png'



export default function Header() {

    let history = useHistory()

    function logOut(){
        localStorage.removeItem('usuario-login')

        history.push('/login')
    }

    return (
        <header className="container_header">
            <div className="grid_header">
                <div className="container_logo">
                    <img className="logo" src={Logo} alt="Logo" />
                </div>
                <nav className="container_nav">
                    <div className="container_icon">
                        <a href="#"><img className="icon_home" src={Home} alt="Home" /></a>
                        <p>Home</p>
                    </div>
                    <div className="container_icon">
                        <a href="#"><img className="icon_info" src={Info} alt="Info" /></a>
                        <p>Info</p>
                    </div>
                    <div className="container_icon">
                        <div className="alinhar">
                            <a href="#"><img className="icon_contato" src={Contato} alt="Contato" /></a>
                        </div>
                        <p>Contato</p>
                    </div>
                    <div className="container_icon">
                        <div className="alinhar">
                            <a href="#"><img className="icon_consulta" src={Consulta} alt="Consulta" /></a>
                        </div>
                        <p>Consulta</p>
                    </div>
                    <div className="container_icon ">



                        <div className="alinhar">
                            {
                                usuarioAutenticado() ? (
                                    <div>
                                        <div onClick={logOut}><img className="icon_login" src={Logout} alt="Logout" /></div>
                                        <div className="alinhar_login">
                                            <p>Logout</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <a href="/"><img className="icon_login" src={Login} alt="Login" /></a>
                                        <div className="alinhar_login">
                                            <p>Login</p>
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}