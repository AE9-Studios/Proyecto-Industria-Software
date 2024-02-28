import React from 'react'
import logo from '../../public/pwa-maskable-512x512.png'

const Footer = () => {
    return (
        <div className='bg-white'>
            <div className='div-container-footer mt-5 p-3  bg-white d-flex flex-wrap '>
                <div className="d-flex justify-content-center align-items-center">
                    <img width='100px' src={logo} alt="" />
                    <blockquote className="blockquote mb-0">
                        <p className='ps-4 fs-4 fw-bolder'>Óptica Classic Vision</p>
                        <footer className="ps-3 fst-normal fw-light fs-6 blockquote-footer">Estilo y Elegancia as su Alcance</footer>
                    </blockquote>
                </div>
                <div className="ms-2">
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <div className="d-flex flex-column align-items-center">
                            <h5 className='fs-5 text-decoration-underline'>Contacto</h5>
                            <p><strong>Telefono:</strong> 5555-5555</p>
                            <p><strong>Correo:</strong> classicvision@example.com</p>
                        </div>
                    </div>
                </div>
                <div className="ms-2">
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <div className="d-flex flex-column align-items-center">
                            <h5 className='fs-5 text-decoration-underline'>Redes Sociales</h5>
                            <div className="d-flex">
                                <a className='ps-2' href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                    <i className="bi bi-facebook fs-2"></i>
                                </a>
                                <a className='ps-2' href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                    <i className="bi bi-instagram fs-2"></i>
                                </a>
                                <a className='ps-2' href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                                    <i className="bi bi-twitter fs-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ms-2">
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <div className="d-flex flex-column align-items-center">
                            <h5 className='fs-5 text-decoration-underline'>Horario</h5>
                            <p><strong>Lunes a Viernes:</strong> 9:00am - 6:00pm</p>
                            <p><strong>Sabados:</strong> 9:00am - 1:00pm</p>
                        </div>
                    </div>
                </div>
                <div className="ms-2">
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <div className="d-flex flex-column align-items-center">
                            <h5 className='fs-5 text-decoration-underline'>Ubicacion</h5>
                            <p>Av. Siempre Viva 742</p>
                            <p>Springfield</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center p-4'>
                <a href="/about">Acerca de</a>
                <a href="/terms-conditions">Terminos y condiciones</a>
            </div>
        </div>
    )
}

export default Footer