import React from 'react';

import Logo from '../../assets/img/Logo.png';
import Facebook from '../../assets/img/Facebook.png';
import Instagram from '../../assets/img/Instagram.png';
import Twitter from '../../assets/img/Twitter.png';

import { Link } from 'react-router-dom';

export default function Footer(){
    return(
        <footer>
        <div className="content-cabecalho">

            <div className="esquerdo-footer">
                <div className="altura-">
                    <a href="#">Sobre nós</a>
                    <div className="faleConosco">
                        <p>Fale conosco</p>
                        <input type="text" />
                    </div>
                </div>
            </div>

            <div className="centro-footer">
                <div className="altura--">
                    <div className="logo-footer">
                    <Link to='/'><img src={Logo} alt="Logo do Sp Medical Group" /></Link>
                    <Link className='link-home' to='/'><p>SP Medical<br/>Group </p></Link>
                    </div>
                    <p>Todos os direitos reservado</p>
                </div>
            </div>

            <div className="direito-footer">
                <div className="cima">
                    <p>Siga nossas redes sociais</p>
                </div>
                <div className="redes">
                    <a href="#"><img src={Facebook} alt="Logo do facebook" /></a>
                    <a href="#"><img src={Instagram} alt="Logo do instagram" /></a>
                    <a href="#"><img src={Twitter} alt="Logo do twitter" /></a>
                </div>
            </div>
        </div>
    </footer>
    );
}