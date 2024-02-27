import React from 'react'
import slideImg1 from '../../public/Sunglasses-bg.jpg'
import slideImg2 from '../../public/book-3101151_1280.jpg'
import product1 from '../../public/glasses-5486967_1280.jpg'
import product2 from '../../public/eye.jpg'
import product3 from '../../public/spectacles-1398424_960_720.jpg'
import product4 from '../../public/reading-4330761_1280.jpg'
import ProductCardSimple from '../components/ProductCardSimple'
import ServiceCardHome from '../components/ServiceCardHome'

const LaddingPage = () => {
    return (
        <div><div className='shadow'>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>

                <div className="carousel-inner">

                    <div className="carousel-item active" style={{ maxHeight: '500px', overflow: 'hidden' }}>
                        <img src={slideImg1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <div className="bg-secondary py-4 bg-opacity-50">
                                <h5 className=' fs-1'>¡Bienvenido a Óptica Classic Vision!</h5>
                                <p>Estilo y Elegancia a tu alcance</p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item active" style={{ maxHeight: '500px', overflow: 'hidden' }}>
                        <img src={slideImg2} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <div className="bg-secondary py-4 bg-opacity-50">
                                <h5 className=' fs-1'>Productos y Servicios de Calidad</h5>
                                <p>la mejor opción para tu vista</p>
                            </div>
                        </div>
                    </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

            <div className='container'>
                <h2 className='fs-1 text-center pb-3 pt-5'>Categorias de Productos</h2>
                <div className="div-container-productCategoryHome d-flex flex-wrap">
                    <ProductCardSimple title='Gafas de sol' img={product3} url='sunglases' />

                    <ProductCardSimple title='Lentes' img={product4} url='glasses' />

                    <ProductCardSimple title='Lentes de contacto' img={product2} url='contact-lents' />

                    <ProductCardSimple title='Accesorios' img={product1} url='accesories' />
                </div>
            </div>

            <div className="container  mb-5">
                <h2 className='fs-1 text-center pb-3 pt-5'>Servicios Ofrecidos</h2>
                <div className="d-flex align-items-center justify-content-center flex-wrap shadow bg-white rounded-4 py-5">
                    <ServiceCardHome title='Reparación' description='Reparaciones rápidas' icon="bi bi-wrench" />
                    <ServiceCardHome title='Examen de la vista' description='Examen de la vista gratis' icon='bi bi-eyeglasses' />
                    <ServiceCardHome title='Personalización' description='Ajustes de lentes gratis' icon='bi bi-person-fill' />
                </div>
            </div>

            <div className='bg-white shadow'>
                <div className="container-appointment-home container d-flex flex-column justify-content-center pb-5 p-4">
                    <h1 className='text-center'>Esperiencia de compras conveniente y rápida</h1>
                    <p className="text-center fs-5">
                        Haga su cita ahora mismo y reciba un 10% de descuento en sus gafas de sol.
                    </p>
                    <a className='btn btn-primary' href="/client/appointment">Solicitar una cita</a>

                </div>
            </div>
        </div>
    )
}

export default LaddingPage