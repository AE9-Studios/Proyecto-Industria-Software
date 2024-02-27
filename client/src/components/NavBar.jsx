import React from 'react'
import logo from '../../public/pwa-512x512.png'
import { useAuth } from '../context/AuthContext'

const NavBar = () => {

    const { user, isAuthenticated } = useAuth()

    const location = window.location.pathname

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <div className="d-flex align-items-center justify-content-center">
                            <img width='60px' src={logo} alt="" />
                            <blockquote className="blockquote mb-0">
                                <p className='ps-4 fs-4 fw-bolder'>Óptica Classic Vision</p>
                                <footer className="ps-3 fst-normal fw-light fs-6 blockquote-footer">Estilo y Elegancia as su Alcance</footer>
                            </blockquote>
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${location === "/" ? "active" : ""}`} aria-current="page" href="/">
                                    <i className="bi bi-house-door-fill px-2 fs-4"></i>
                                    Inicio
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location === "/products" ? "active" : ""}`} href="/products">
                                    <i className="bi bi-search px-2 fs-4"></i>
                                    Productos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location === "/services" ? "active" : ""}`} href="/services">
                                    <i className="bi bi-briefcase-fill px-2 fs-4"></i>
                                    Servicios
                                </a>
                            </li>
                        </ul>
                        <span className='nav-item'>
                            {
                                isAuthenticated && <spam className="nav-item">
                                    <a className="nav-link me-4" href={`/${user?.role === 'CLIENTE' ? 'client/home' : user?.role === 'ADMINISTRADOR' ? 'admin/home' : user?.role === 'EMPLEADO' ? 'employee/home' : 'login'}`}>
                                        <span className="btn btn-primary">
                                            <i className="bi bi-person-circle px-2 fs-3 text-white"></i>
                                        </span>
                                    </a>
                                </spam>
                            }
                            {
                                !isAuthenticated && <span>
                                    <a className="text-center  me-4 btn btn-primary p-2" href="/login">
                                        Iniciar Sesión
                                    </a>
                                    <a className="text-center  me-4 btn btn-warning p-2" href="/register">
                                        Registrarse
                                    </a>
                                </span>
                            }
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar