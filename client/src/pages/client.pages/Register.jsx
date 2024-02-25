import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { signup, isAuthenticated, errors } = useAuth()
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
  const navigate = useNavigate()


  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
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
          <input type="email" {...register('email', { required: true })} />
          {formErrors.email && <p>El correo es requerido</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" {...register('password', { required: true })} />
          {formErrors.password && <p>La contraseña es requerida</p>}
        </div>
        <div>
          <label>Nombres</label>
          <input type="text" {...register('firstName', { required: true })} />
          {formErrors.firstName && <p>Ingrese sus nombres</p>}
        </div>
        <div>
          <label>Apellidos</label>
          <input type="text" {...register('lastName', { required: true })} />
          {formErrors.lastName && <p>Ingrese sus apellidos</p>}
        </div>
        <div>
          <label>Nombre de Usuario</label>
          <input type="text" {...register('userName', { required: true })} />
          {formErrors.userName && <p>Ingrese un Nombre de usuario</p>}
        </div>
        <div>
          <label>Telefono</label>
          <input type="tel" {...register('phone', { required: true, pattern: /^\d{8}$/ })} />
          {formErrors.phone && <p>Ingrese un telefono</p>}
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" {...register('address', { required: true })} />
          {formErrors.address && <p>Ingrese una dirección</p>}
        </div>
        <div>
          <label>Fecha de Nacimiento</label>
          <input type="date" {...register('birthDate', { required: true })} />
          {formErrors.birthDate && <p>Ingrese una fecha de nacimiento</p>}
        </div>
        <div>
          <label>DNI</label>
          <input type="number" {...register('dni', { required: true, pattern: /^\d{13}$/ })} />
          {formErrors.dni && <p>Ingrese un DNI correctamente, son 13 dígitos sin guiones ni espacios</p>}
        </div>
        <div>
          <label>Genero</label>
          <select {...register('gender', { required: true })}>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMENINO">Femenino</option>
          </select>
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </>
  )
}

export default Register