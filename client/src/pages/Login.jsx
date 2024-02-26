import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'


const Login = () => {

    const {signin, isAuthenticated, errors} = useAuth()
    const {register, handleSubmit, formState: {errors: formErrors}} = useForm()
    const navigate = useNavigate() 


    useEffect(()=> {
        if (isAuthenticated && user.role === 'CLIENTE' ) navigate('/client/home')
        if (isAuthenticated && user.role === 'EMPLEADO' ) navigate('/employee/home')
        if (isAuthenticated && user.role === 'ADMINISTRADOR' ) navigate('/admin/home')
    }, [isAuthenticated])

    const onSubmit = handleSubmit( async (values)=>{
        signin(values)
    })



  return (
    <>
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            {
                errors.length > 0 && (
                    <div>
                        <ul>
                            {errors.map((error, index) => <p key={index}>{error}</p>)}
                        </ul>
                    </div>
                )
            }
            <div>
                <label>Correo</label>
                <input type="email" {...register('email', {required: true})} />
                {formErrors.email && <p>El correo es requerido</p>}
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" {...register('password', {required: true})} />
                {formErrors.password && <p>La contraseña es requerida</p>}
            </div>
            <button type="submit">Ingresar</button>
        </form>
    </>
  )
}

export default Login