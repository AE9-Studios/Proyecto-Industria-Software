import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { signup, isAuthenticated, errors, user } = useAuth()
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
  const navigate = useNavigate()


  useEffect(() => {
    if (isAuthenticated && user.role === 'CLIENTE') navigate('/client/home')
    if (isAuthenticated && user.role === 'EMPLEADO') navigate('/employee/home')
    if (isAuthenticated && user.role === 'ADMINISTRADOR') navigate('/admin/home')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })



  return (
    <>
      <div className="container-sm mb-3">
        <form className="mx-auto shadow mt-3 mx-auto rounded-4 bg-white" style={{ maxWidth: '700px' }} onSubmit={onSubmit}>
          <div className="px-4 pt-3">
            <a href="/" className="text-decoration-none" style={{ color: 'gray', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'black'} onMouseOut={(e) => e.target.style.color = 'gray'}>Volver</a>
            <p className="text-center fw-bold">Registrese</p>

          </div>

          <div className=' pt-3 pb-5'>
            <div className="d-flex flex-column align-items-center p-5">
              <h2 className="text-center mb-3">Llene el formulario para registrarse</h2>
              <div className="container d-flex flex-column">
                {errors.length > 0 && (
                  <>
                    {errors.map((error, index) => <span className='alert alert-warning' key={index}>{error}</span>)}
                  </>
                )}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Correo</label>
                <input placeholder='Ingrese su dirección de correo' className="form-control" type="email" {...register('email', { required: true })} />
                {formErrors.email && <span className="form-text text-danger">El correo es requerido</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Contraseña</label>
                <input placeholder='Ingrese una contraseña' className="form-control" type="password" {...register('password', { required: true })} />
                {formErrors.password && <span className="form-text text-danger">La contraseña es requerida</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Confirmar contraseña</label>
                <input placeholder='Repita la contraseña anterior' className="form-control" type="password" {...register('password', { required: true })} />
                {formErrors.password && <span className="form-text text-danger">La confirmación de contraseña es requerida</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Nombres</label>
                <input placeholder='Ingreses sus nombres' className="form-control" type="text" {...register('firstName', { required: true })} />
                {formErrors.firstName && <span className="form-text text-danger">Ingrese sus nombres</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Apellidos</label>
                <input placeholder='Ingrese sus apellidos' className="form-control" type="text" {...register('lastName', { required: true })} />
                {formErrors.lastName && <span className="form-text text-danger">Ingrese sus apellidos</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Telefono</label>
                <input placeholder='Número de telefono (Opcional)' className="form-control" type="tel" {...register('phone', { pattern: /^\d{8}$/ })} />
                {formErrors.phone && <span className="form-text text-danger">8 dígitos, sin guiones ni espacios</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Dirección</label>
                <input placeholder='Dirección de residencia (Opcional)' className="form-control" type="text" {...register('address')} />

              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Fecha de Nacimiento</label>
                <input className="form-control" type="date" {...register('birthDate', { required: true })} />
                {formErrors.dni && <span className="form-text text-danger">Fecha de nacimiento requerida</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">DNI</label>
                <input placeholder='Ingrese su número de identidad' className="form-control" type="number" {...register('dni', { required: true, pattern: /^\d{13}$/ })} />
                {formErrors.dni && <span className="form-text text-danger">Ingrese un DNI correctamente, son 13 dígitos sin guiones ni espacios</span>}
              </div>
              <div className='p-2 mb-3 container'>
                <label className="form-label">Genero</label>
                <select className="form-control" {...register('gender', { required: true })}>
                  <option value="" hidden defaultValue>Seleccione una opción</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                </select>
                {
                  formErrors.gender && <span className="form-text text-danger">Seleccione su genero</span>
                }
              </div>

              <div className="container d-flex flex-column">

                <button className="btn btn-primary mt-3 py-2 px-5 rounded-4 " type="submit">Ingresar</button>
              </div>

              <div className="container mt-5">
                <a href="/login" className="text-decoration-none">¿Ya tienes una cuenta? <span className='fw-bold'>Inicia sesión</span></a>
              </div>
            </div>
          </div>

        </form>
      </div>
    </>
  )
}

export default Register