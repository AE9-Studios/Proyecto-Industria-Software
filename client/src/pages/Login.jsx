import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'


const Login = () => {

    const { signin, isAuthenticated, errors, user } = useAuth()
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
    const navigate = useNavigate()


    useEffect(() => {
        if (isAuthenticated && user.role === 'CLIENTE') navigate('/client/home')
        if (isAuthenticated && user.role === 'EMPLEADO') navigate('/employee/home')
        if (isAuthenticated && user.role === 'ADMINISTRADOR') navigate('/admin/home')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signin(values)
    })

    return (
        <>
            <div className="container-sm mb-3">

                <form className="mx-auto shadow mt-3  mx-auto rounded-4 bg-white" style={{ maxWidth: '500px' }} onSubmit={onSubmit}>
                    <div className="px-4 pt-3">
                        <a href="/" className="text-decoration-none" style={{ color: 'gray', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'black'} onMouseOut={(e) => e.target.style.color = 'gray'}>Volver</a>
                        <p className="text-center fw-bold">Inicio de Sesión</p>
                    </div>

                    <div className=' pt-3 pb-5'>

                        <div className="d-flex flex-column align-items-center p-5">
                            <h2 className="text-center mb-3">Inicia sesión en tu cuenta antes de continuar</h2>
                            <div className="container d-flex flex-column">
                                {errors.length > 0 && (
                                    <>
                                        {errors.map((error, index) => <p className='alert alert-warning' key={index}>{error}</p>)}
                                    </>
                                )}
                            </div>
                            <div className='p-2 mb-3 container'>
                                <label className="form-label">Correo</label>
                                <input placeholder='Ingrese su correo electrónico' className="form-control" type="email" {...register('email', { required: true })} />
                                {formErrors.email && <span className="form-text text-danger">El correo es requerido</span>}
                            </div>
                            <div className='p-2 mb-3 container-sm'>
                                <label className="form-label">Contraseña</label>
                                <input placeholder='Ingrese su contraseña' className="form-control" type="password" {...register('password', { required: true })} />
                                {formErrors.password && <span className="form-text text-danger">La contraseña es requerida</span>}
                            </div>


                            <div className="container pb-2">
                                <a href="/forgot-password" className="text-decoration-none" style={{ color: 'gray', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'black'} onMouseOut={(e) => e.target.style.color = 'gray'}>¿Olvidaste tu contraseña?</a>
                            </div>
                            <div className="container d-flex flex-column">

                                <button className="btn btn-primary mt-3 py-2 px-5 rounded-4 " type="submit">Ingresar</button>
                            </div>

                            <div className="container mt-5">
                                <a href="/register" className="text-decoration-none">¿No tienes una cuenta? <span className='fw-bold'>Regístrate</span></a>
                            </div>

                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login