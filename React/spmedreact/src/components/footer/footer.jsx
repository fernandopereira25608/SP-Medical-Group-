import React from "react";

import '../../assets/css/footer.css'
import Logo from '../../assets/img/SpMedGroup_Logo 1.png'

export default function Footer() {
    return (
        <footer className="container_footer">
            <div className="grid_footer">
                <div className="container_logo">
                    <img className="logo" src={Logo} alt="Logo" />
                </div>
                <div className="container_about">
                    <h2>Sobre Nós</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis orci, venenatis sit amet ullamcorper non, interdum a turpis. Ut pharetra pulvinar lacus eu ultricies. </p>
                </div>
                <div className="container_email">
                    <span>Email</span>
                    <div className="nws">
                        <input type="email"
                            placeholder="Email" />
                        <button>Enviar</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}